import { Client } from './types';

export function getLabelType(type: string) {
  switch (type) {
    case 'delivery':
      return 'Доставка';

    case 'pickup':
      return 'Забрать';

    default:
      return 'Неизвестно';
  }
}

export function getClientById(clients: Client[], clientId: number) {
  return clients.find(client => client.id === clientId);
}
