import { User } from "@/types/user";
import { Link } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const UserList: React.FC<{ foundUsers: User[], onUserSelect: () => void }> = ({ foundUsers, onUserSelect }) => {

  return (
    <>
      {foundUsers.slice(0, 3).map((item) => (
        <p>
          <Popover key={item.id}>
            <PopoverTrigger>
              <div className="flex items-center">
                <img src={item.profilePicture} alt="" className="w-8 h-8 object-cover mr-4 rounded-full" />                
                <span>{item.displayName}</span>
              </div>
            </PopoverTrigger>
            <PopoverContent className="bg-dark-bg border border-dark-border text-xs text-primary-text ">
              <Link to={`/user/${item.displayName}`} key={item.id} className="flex items-center" onClick={onUserSelect}  >
                <img src={item.profilePicture} alt="" className="w-8 h-8 object-cover mr-4 rounded-full" />
                <span>{item.displayName}</span>
              </Link>
            </PopoverContent>
          </Popover>
        </p>
      ))}
    </>
  );
};

export default UserList;
