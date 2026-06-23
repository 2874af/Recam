import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import FindPasswordPage from './pages/FindPasswordPage'
import ConditionsPage from './pages/ConditionsPage'
import OrderListPage from './pages/OrderListPage'
import ClientListPage from './pages/ClientListPage'
import CreateClientPage from './pages/CreateClientPage'
import CreateOrderPage from './pages/CreateOrderPage'
import OrderDetailPage from './pages/OrderDetailPage'
import StaffListPage from './pages/StaffListPage'
import ClientDetailPage from './pages/ClientDetailPage'
import ScheduledOrderDliveryPage from './pages/ScheduledOrderDliveryPage'
import CreateStaffPage from './pages/CreateStaffPage'
import StaffDetailPage from './pages/StaffDetailPage'
import AgentDashboardPage from './pages2/AgentDashboardPage'
import ShowPage from './pages2/ShowPage'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/find" element={<FindPasswordPage />} />
        <Route path="/conditions" element={<ConditionsPage />} />
        <Route path="/dashboard" element={<OrderListPage />} />
        <Route path="/clientlist" element={<ClientListPage />} />
        <Route path="/createorder" element={<CreateOrderPage />} />
        <Route path="/createclient" element={<CreateClientPage />} />
        <Route path="/orderdetail" element={<OrderDetailPage />} />
        <Route path="/stafflist" element={<StaffListPage />} />
        <Route path="/clientdetail" element={<ClientDetailPage />} />
        <Route path="/scheduleddelivery" element={<ScheduledOrderDliveryPage />} />
        <Route path="/createstaff" element={<CreateStaffPage />} />
        <Route path="/staffdetail" element={<StaffDetailPage />} />
        <Route path="/agentdashboard" element={<AgentDashboardPage />} />
        <Route path="/showpage" element={<ShowPage />} />
      </Routes>
    </>
  )
}

export default App
