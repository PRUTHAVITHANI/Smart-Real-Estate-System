import React , {userRef , useState , useEffect} from "react";
import { message, Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/user/alertsSlice.js";
import { useNavigate } from "react-router-dom";
import AdminNav from './AdminNav';
import AdminHeader from './AdminHeader';
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); 

const NotificationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [newNotification, setNewNotification] = useState(null);

  useEffect(() => {
    socket.on('notification', (notification) => {
      setNewNotification(notification);
    });

    return () => {
      socket.off('notification');
    };
  }, []);

  useEffect(() => {
    if (newNotification) {
      // Handle the new notification, e.g., display a message
      message.success(newNotification.message);
    }
  }, [newNotification]);

  const handleMarkAllRead = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const res = await fetch('/api/user/get-all-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userRef: currentUser._id,
        }),
      });
  
      dispatch(hideLoading());
      if (res.ok) {
        const data = await res.json(); // Parse response body
        if (data.success) {
          message.success(data.message);
        } else {
          message.error(data.message);
        }
      } else {
        // Handle non-200 response status
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };
  

  const handleDeleteAllRead = async () => { };

  return (
    <div className='flex flex-col md:flex-row  text-white'>
      <AdminNav />
      <div className='w-full'>
        <AdminHeader />
      <h4 className="p-3 text-center text-black">Notification Page</h4>
      <Tabs>
        <Tabs.TabPane tab="unRead" key={0}>
          <div className="d-flex justify-content-end">
            <h4 className="p-2" onClick={handleMarkAllRead}>
              Mark All Read
            </h4>
          </div>

       {currentUser && currentUser.notification && currentUser.notification.map((notificationMgs) => (
  <div className="card" style={{ cursor: "pointer" }} key={notificationMgs.id}>
    <div
      className="card-text"
      onClick={() => navigate(notificationMgs.onClickPath)}
    >
      {notificationMgs.message}
    </div>
  </div>
))}

        </Tabs.TabPane>
        <Tabs.TabPane tab="Read" key={1}>
          <div className="d-flex justify-content-end">
            <h4 className="p-2" onClick={handleDeleteAllRead}>
              Delete All Read
            </h4>
          </div>
        </Tabs.TabPane>
      </Tabs>
      </div>
      </div>
 
  );
};

export default NotificationPage;