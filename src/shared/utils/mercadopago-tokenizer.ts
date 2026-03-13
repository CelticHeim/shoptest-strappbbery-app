/**
 * Tokenize card data using Mercado Pago card_tokens endpoint
 * This is the proper way to generate tokens before sending to backend
 */

const MERCADO_PAGO_PUBLIC_KEY = import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY || 'TEST-1234567890';

interface CardData {
  cardNumber: string;
  cardHolder: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
}

interface TokenizationResponse {
  id: string;
  public_key?: string;
  status?: string;
}

/**
 * Generate a test token for development mode
 */
function generateTestToken(cardData: CardData): string {
  // For development/testing, generate a token that looks like a Mercado Pago token
  // Real tokens look like: "123456789-abcdef1234567890"
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 13);
  const cardLast4 = cardData.cardNumber.slice(-4);
  return `test_${timestamp}_${random}_${cardLast4}`;
}

export async function tokenizeCard(cardData: CardData): Promise<string> {
  const isTestMode = MERCADO_PAGO_PUBLIC_KEY.startsWith('TEST-') || 
                     MERCADO_PAGO_PUBLIC_KEY === 'TEST-1234567890';

  // In test mode, generate a simulated token for development
  if (isTestMode) {
    console.log('Using test mode token for development');
    const testToken = generateTestToken(cardData);
    console.log('Test token generated:', testToken);
    return testToken;
  }

  // In production mode, use real Mercado Pago tokenization
  const payload = {
    cardNumber: cardData.cardNumber.replace(/\s/g, ''),
    cardholderName: cardData.cardHolder,
    cardExpirationMonth: cardData.expiryMonth,
    cardExpirationYear: cardData.expiryYear,
    securityCode: cardData.cvv,
  };

  try {
    const response = await fetch('https://api.mercadopago.com/v1/card_tokens', {
      method: 'POST',
      headers: {
        'X-Idempotency-Key': `${Date.now()}-${Math.random()}`,
        'Authorization': `Bearer ${MERCADO_PAGO_PUBLIC_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    const result = (await response.json()) as TokenizationResponse;

    if (!response.ok) {
      throw new Error(
        `Mercado Pago tokenization failed: ${JSON.stringify(result)}`
      );
    }

    if (!result.id) {
      throw new Error('No token received from Mercado Pago');
    }

    console.log('Card tokenized successfully:', result.id);
    return result.id;
  } catch (error) {
    console.error('Tokenization error:', error);
    throw error;
  }
}
