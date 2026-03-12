import { ReactNode } from 'react';

interface TFooterProps {
  children: ReactNode;
}

export function TFooter({ children }: TFooterProps) {
  return (
    <tfoot>
      <tr>
        <td colSpan={100} className="p-6">
          {children}
        </td>
      </tr>
    </tfoot>
  );
}
