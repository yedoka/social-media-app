import { useProfileQuery } from "@/shared/api";
import { Text } from "@chakra-ui/react";
import { EditForm } from "@/features/profile/ui/ProfileEditForm";
import { ProfileDetails } from "@/features/profile/ui/ProfileDetails";
import { useState } from "react";

export const Profile = () => {
  const { data, isLoading, error } = useProfileQuery();
  const [isEditing, setEditing] = useState(false);

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Failed to load user data. Please try again.</Text>;
  if (!data) return <Text>No user</Text>;

  return (
    <>
      {isEditing ? (
        <EditForm data={data} onCancel={() => setEditing(false)} />
      ) : (
        <ProfileDetails userData={data} onEdit={() => setEditing(true)} />
      )}
    </>
  );
};
