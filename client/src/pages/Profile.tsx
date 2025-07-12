import { Text } from "@chakra-ui/react";
import { EditForm } from "@/features/profile/ui/ProfileEditForm";
import { ProfileDetails } from "@/features/profile/ui/ProfileDetails";
import { useState } from "react";
import { useUserStore } from "@/features/profile/model/useUserStore";

export const Profile = () => {
  const [isEditing, setEditing] = useState(false);
  const { currentUserProfile, isLoadingProfile, error } = useUserStore();

  if (isLoadingProfile) return <Text>Loading...</Text>;
  if (error) return <Text>Failed to load user data. Please try again.</Text>;
  if (!currentUserProfile) return <Text>No user</Text>;

  return (
    <>
      {isEditing ? (
        <EditForm
          data={currentUserProfile}
          onCancel={() => setEditing(false)}
        />
      ) : (
        <ProfileDetails
          userData={currentUserProfile}
          onEdit={() => setEditing(true)}
        />
      )}
    </>
  );
};
