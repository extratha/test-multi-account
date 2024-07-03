export interface ConsentService {
  title: string;
  logo: string;
  content: string;
}

export interface ConsentData {
  content: string;
  services: ConsentService[];
}

export interface ConsentResult {
  isConsent: boolean;
  version: string;
  consent: ConsentData;
}
