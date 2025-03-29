import EditForm from "@/components/profile/EditForm";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import ProfileDetails from "@/components/profile/ProfileDetails";
import LoadingSpinner from "@/components/ui/spinner/LoadingSpinner";
import ErrorMessage from "@/components/ui/spinner/ErrorMessage";
import { useProfile } from "@/hooks/useProfile";

const Profile = () => {
  const isEditing = useSelector((state: RootState) => state.editProfile.isEditing);
  const { data, isLoading, isError, error } = useProfile();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorMessage message="Failed to load user data. Please try again." />;
  }

  return (
    <section>
      {isEditing ? (
        <EditForm data={data} />
      ) : (
        <ProfileDetails data={data} isLoading={isLoading} error={error} />
      )}
    </section>
  );
};

export default Profile;