import Authority from "@/types/Authority";

interface User {
  id: string;
  email: string;
  address: string;
  enabled: boolean;
  authorities: Authority[];
  username: string;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  full_name: string;
  phone_number: string;
  date_of_birth: string;
  avatar_url: string;
  cover_url: string;
  user_type: string;
  is_deleted: boolean;
}

export default User;
