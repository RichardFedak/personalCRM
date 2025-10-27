export interface Translations {
  common: {
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    add: string;
    search: string;
    loading: string;
    error: string;
    success: string;
    confirm: string;
  };
  tabs: {
    contacts: string;
    explore: string;
  };
  contacts: {
    title: string;
    addContact: string;
    searchPlaceholder: string;
    noContacts: string;
    contactDetails: string;
    newContact: string;
    newContactCreatedMessage: string;
    lastEdited: string;
    created: string;
    notFound: string;
  };
  contactForm: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    notes: string;
    address: string;
    firstNamePlaceholder: string;
    lastNamePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    companyPlaceholder: string;
    notesPlaceholder: string;
  };
  notes: {
    title: string;
    addNote: string;
    newNote: string;
    noNotes: string;
    noteContent: string;
    noteContentPlaceholder: string;
    noteCreatedMessage: string;
    noteUpdatedMessage: string;
    noteCreationFailedMessage: string;
    noteUpdateFailedMessage: string;
  };
  validation: {
    required: string;
    nameRequired: string;
    noteTitleRequired: string;
    noteContactIdRequired: string;
    invalidEmail: string;
    invalidPhone: string;
  };
  settings: {
    title: string;
    theme: string;
    language: string;
    themeLight: string;
    themeDark: string;
    themeSystem: string;
    languageEnglish: string;
    languageSlovak: string;
  };
}