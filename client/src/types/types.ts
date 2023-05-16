interface Profile {
  Id?: number;
  name: string;
  date: string;
  description: string;
  email: string;
  city: string;
  joindate: string;
  phonenum: string;
  position: string;
  role: string;
  gender: string;
  experience: string;
  imgUrl: string;
}

interface SearchProfile {
  Id?: number;
  name: string;
  date: string;
  description: string;
  email: string;
  city: string;
  joindate: string;
  phonenum: string;
  position: string;
  role: string;
  gender: string;
  experience: string;
  imgUrl: string;
}

export type { Profile, SearchProfile };
