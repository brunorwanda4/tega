export const projectContacts = [
  {
    name: "Ngabonziza Brunel",
    email: "Ngabonzizabrunel@gmail.com",
    phone: "0785190645",
  },
  {
    name: "Ishimwe Reponse",
    email: "ishimwereponse5@gmail.com",
    phone: "0783599232",
  },
  {
    name: "Mudasumbwa Leilla",
    email: "mudasumbwaleilla@gmail.com",
    phone: "0794969163",
  },
] as const;

export const primaryProjectContact = projectContacts[2];

export const getProjectContact = (index: number) =>
  projectContacts[index % projectContacts.length];

export const getPrimaryContactMailto = (subject: string) =>
  `mailto:${primaryProjectContact.email}?subject=${encodeURIComponent(subject)}`;
