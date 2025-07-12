import { auth } from "@/shared/config/config";

export function checkIsOwnProfile(displayName?: string) {
  return auth.currentUser?.displayName === displayName;
}
