import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadSingleUserServers } from "../../store/servers";

export default function ServersNavBar() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const servers = useSelector(state => state.servers);

  console.log('user.id: ', user.id)

  useEffect(() => {
    dispatch(loadSingleUserServers(user.id));
  }, [dispatch])

  return (
    <div>
      Server Navbar
      {servers && Object.values(servers).map(server => (
        <h3>{server.name}</h3>
      ))}
    </div>
  );
}
