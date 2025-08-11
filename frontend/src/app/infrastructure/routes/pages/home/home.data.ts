export interface AuxData {
  id: number;
  person: {
    name: string;
    lastName: string;
  };
  contact: {
    address: string;
    email: string;
    phone: string;
  };
}
export const auxData: AuxData[] = [];
for (let i = 1; i <= 100; i++) {
  auxData.push({
    id: i,
    person: {
      name: `Name ${i}`,
      lastName: `LastName ${i}`,
    },
    contact: {
      address: `Address ${i}`,
      email: `mail${i}@mail.com`,
      phone: `+1234567890${i}`,
    },
  });
}
