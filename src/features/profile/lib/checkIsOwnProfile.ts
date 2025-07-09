import { auth } from "@/services/api/config";

export function checkIsOwnProfile(displayName?: string) {
  return auth.currentUser?.displayName === displayName;
}
