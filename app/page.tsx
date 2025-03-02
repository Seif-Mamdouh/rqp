
import UserList from "./components/userList";

export default function Home() {
  return (
      <div >
        <h1 className="text-4xl font-bold">
          Welcome to the Home Page
        </h1>
        <UserList />
      </div>
  );
}
