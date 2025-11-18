import { useState } from 'react';
import Home from './components/Home';
import FinancialAnalysis from './components/FinancialAnalysis';
import AnalysisResult from './components/AnalysisResult';
import InvestmentProgress from './components/InvestmentProgress';
import MonthlyTracking from './components/MonthlyTracking';
import UpdateIncomeExpense from './components/UpdateIncomeExpense';
import FutureForecast from './components/FutureForecast';
import ConsultingSupport from './components/ConsultingSupport';
import ExpertConsulting from './components/ExpertConsulting';
import BookExpert from './components/BookExpert';
import BookingConfirmation from './components/BookingConfirmation';
import DailyCheckIn from './components/DailyCheckIn';
import Forum from './components/Forum';
import AIChatbot from './components/AIChatbot';
import History from './components/History';
import Notifications from './components/Notifications';
import Profile from './components/Profile';
import Statistics from './components/Statistics';
import BudgetManager from './components/BudgetManager';
import Settings from './components/Settings';
import FinancialTools from './components/FinancialTools';
import BottomNavigation from './components/BottomNavigation';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import Welcome from './components/Welcome';
import PersonalInfo from './components/PersonalInfo';
import ChangePassword from './components/ChangePassword';
import HelpCenter from './components/HelpCenter';
import ContactSupport from './components/ContactSupport';
import TermsOfService from './components/TermsOfService';
import PrivacyPolicy from './components/PrivacyPolicy';
import CreatePost from './components/CreatePost';
import ThreadDetail from './components/ThreadDetail';
import { Goal } from './types';

type Screen =
  | 'login' // Đăng nhập
  | 'register' // Đăng ký
  | 'forgotPassword' // Quên mật khẩu
  | 'welcome' // Màn hình chào mừng
  | 'home' // Trang chủ
  | 'input' // Màn hình nhập liệu
  | 'result' // Screen 1: Kết quả phân tích
  | 'progress' // Screen 2: Tiến độ đầu tư
  | 'tracking' // Screen 3: Theo dõi hàng tháng
  | 'update' // Screen 4: Cập nhật thu chi
  | 'forecast' // Screen 5: Dự báo dài hạn
  | 'consulting' // Tư vấn AI
  | 'expertList' // Danh sách chuyên gia
  | 'bookExpert' // Đặt lịch chuyên gia
  | 'bookingConfirm' // Xác nhận đặt lịch
  | 'checkin' // Điểm danh
  | 'forum' // Diễn đàn
  | 'createPost' // Tạo bài viết
  | 'threadDetail' // Chi tiết bài viết
  | 'aichat' // Chatbot AI
  | 'history' // Lịch sử
  | 'notifications' // Thông báo
  | 'profile' // Hồ sơ
  | 'statistics' // Thống kê
  | 'budget' // Ngân sách
  | 'tools' // Công cụ tài chính
  | 'settings' // Cài đặt
  | 'personalInfo' // Thông tin cá nhân
  | 'changePassword' // Đổi mật khẩu
  | 'helpCenter' // Trung tâm trợ giúp
  | 'contactSupport' // Liên hệ hỗ trợ
  | 'termsOfService' // Điều khoản dịch vụ
  | 'privacyPolicy'; // Chính sách bảo mật

interface AnalysisData {
  monthlyIncome: number;
  monthlyExpense: number;
  currentSavings: number;
  currentDebt: number;
  debtInterestRate: number;
  goalType: string;
  goalLabel: string;
  targetAmount: number;
  interestRate: number;
  timeYears: number;
  riskProfile?: string;
  riskScore?: number;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [monthlySavings, setMonthlySavings] = useState(0);
  const [bookingData, setBookingData] = useState<{ expertName: string; date: string; time: string } | null>(null);
  const [currentGoal, setCurrentGoal] = useState<Goal | null>(null);
  const [selectedForumId, setSelectedForumId] = useState<string>('');
  const [selectedThreadId, setSelectedThreadId] = useState<string>('');
  
  // Forum metadata
  const forumMetadata: Record<string, { name: string; color: string }> = {
    gold: { name: 'Vàng', color: 'from-yellow-500 to-yellow-600' },
    stocks: { name: 'Cổ phiếu', color: 'from-green-500 to-green-600' },
    bonds: { name: 'Trái phiếu', color: 'from-blue-500 to-blue-600' },
    realestate: { name: 'Nhà đất', color: 'from-orange-500 to-orange-600' },
    bitcoin: { name: 'Bitcoin & Crypto', color: 'from-purple-500 to-purple-600' },
  };

  const handleLogin = (email: string, password: string) => {
    // Mock login - trong thực tế sẽ gọi API
    console.log('Login:', email, password);
    setIsAuthenticated(true);
    setCurrentScreen('home');
  };

  const handleRegister = (name: string, email: string, password: string, phone: string) => {
    // Mock register - trong thực tế sẽ gọi API
    console.log('Register:', name, email, password, phone);
    setIsAuthenticated(true);
    setCurrentScreen('welcome');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentScreen('login');
    setCurrentGoal(null);
  };

  const handleAnalysisComplete = (data: AnalysisData) => {
    setAnalysisData(data);
    // Tính toán monthly savings
    const monthlyDebtPayment =
      data.currentDebt > 0
        ? Math.min(data.currentDebt * 0.05, (data.monthlyIncome - data.monthlyExpense) * 0.3)
        : 0;
    const actualSavings = data.monthlyIncome - data.monthlyExpense - monthlyDebtPayment;
    setMonthlySavings(actualSavings);
    setCurrentScreen('result');
  };

  const handleUpdateIncome = (income: number, expense: number) => {
    if (analysisData) {
      const monthlyDebtPayment =
        analysisData.currentDebt > 0
          ? Math.min(analysisData.currentDebt * 0.05, (income - expense) * 0.3)
          : 0;
      const actualSavings = income - expense - monthlyDebtPayment;
      setMonthlySavings(actualSavings);
      setAnalysisData({
        ...analysisData,
        monthlyIncome: income,
        monthlyExpense: expense,
      });
    }
    setCurrentScreen('tracking');
  };

  const handleApplyScenario = (newMonthlySavings: number, interestRate: number) => {
    setMonthlySavings(newMonthlySavings);
    setCurrentScreen('progress');
  };

  // Create a mock Goal object for ConsultingSupport
  const mockGoal: Goal = analysisData
    ? {
        id: '1',
        category: analysisData.goalLabel,
        type: analysisData.goalType,
        targetCost: analysisData.targetAmount,
        targetAmount: analysisData.targetAmount,
        timeYears: 10,
        interestRate: 6,
        currentSavings: analysisData.currentSavings,
        currentAmount: analysisData.currentSavings,
        monthlySavings: monthlySavings,
        monthlyContribution: monthlySavings,
        progress: (analysisData.currentSavings / analysisData.targetAmount) * 100,
        deadline: new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000).toISOString(),
        createdDate: new Date().toISOString(),
      }
    : {
        id: '1',
        category: 'Mục tiêu',
        targetCost: 0,
        timeYears: 10,
        interestRate: 6,
        currentSavings: 0,
        monthlySavings: 0,
        progress: 0,
      };

  return (
    <div className="min-h-screen bg-[#f0fdfa] flex items-center justify-center p-4">
      {/* iPhone 16 container */}
      <div className="w-full max-w-[393px] min-h-[852px] bg-background shadow-2xl overflow-hidden flex flex-col relative">
        {/* Content - scrollable */}
        <div className="flex-1 overflow-y-auto bg-white pb-16">
          {currentScreen === 'login' && (
            <Login
              onLogin={handleLogin}
              onRegister={() => setCurrentScreen('register')}
              onForgotPassword={() => setCurrentScreen('forgotPassword')}
            />
          )}

          {currentScreen === 'register' && (
            <Register
              onRegister={handleRegister}
              onLogin={() => setCurrentScreen('login')}
            />
          )}

          {currentScreen === 'forgotPassword' && (
            <ForgotPassword
              onBack={() => setCurrentScreen('login')}
            />
          )}

          {currentScreen === 'welcome' && (
            <Welcome
              onComplete={() => setCurrentScreen('home')}
              userName="Bạn"
            />
          )}

          {isAuthenticated && (
            <>
              {currentScreen === 'home' && (
                <Home
                  hasAnalysisData={analysisData !== null}
                  currentSavings={analysisData?.currentSavings}
                  targetAmount={analysisData?.targetAmount}
                  monthlySavings={monthlySavings}
                  goalLabel={analysisData?.goalLabel}
                  onStartAnalysis={() => setCurrentScreen('input')}
                  onViewProgress={() => setCurrentScreen('progress')}
                  onViewTracking={() => setCurrentScreen('tracking')}
                  onViewForecast={() => setCurrentScreen('forecast')}
                  onConsultExpert={() => setCurrentScreen('expertList')}
                  onDailyCheckIn={() => setCurrentScreen('checkin')}
                  onForum={() => setCurrentScreen('forum')}
                  onAIChatbot={() => setCurrentScreen('aichat')}
                  onHistory={() => setCurrentScreen('history')}
                  onNotifications={() => setCurrentScreen('notifications')}
                  onProfile={() => setCurrentScreen('profile')}
                  onStatistics={() => setCurrentScreen('statistics')}
                  onBudget={() => setCurrentScreen('budget')}
                  onTools={() => setCurrentScreen('tools')}
                  onSettings={() => setCurrentScreen('settings')}
                />
              )}

              {currentScreen === 'input' && (
                <FinancialAnalysis
                  onAnalysisComplete={handleAnalysisComplete}
                  onAIConsult={() => setCurrentScreen('consulting')}
                  onBack={() => setCurrentScreen('home')}
                />
              )}

              {currentScreen === 'result' && analysisData && (
                <AnalysisResult
                  monthlyIncome={analysisData.monthlyIncome}
                  monthlyExpense={analysisData.monthlyExpense}
                  currentSavings={analysisData.currentSavings}
                  currentDebt={analysisData.currentDebt}
                  debtInterestRate={analysisData.debtInterestRate}
                  goalType={analysisData.goalType}
                  goalLabel={analysisData.goalLabel}
                  targetAmount={analysisData.targetAmount}
                  interestRate={analysisData.interestRate}
                  timeYears={analysisData.timeYears}
                  riskProfile={analysisData.riskProfile}
                  riskScore={analysisData.riskScore}
                  onViewProgress={() => setCurrentScreen('progress')}
                  onBack={() => setCurrentScreen('input')}
                />
              )}

              {currentScreen === 'progress' && analysisData && (
                <InvestmentProgress
                  goalLabel={analysisData.goalLabel}
                  targetAmount={analysisData.targetAmount}
                  currentSavings={analysisData.currentSavings}
                  monthlySavings={monthlySavings}
                  interestRate={analysisData.interestRate}
                  onStartTracking={() => setCurrentScreen('tracking')}
                  onEditGoal={() => setCurrentScreen('input')}
                  onBack={() => setCurrentScreen('result')}
                />
              )}

              {currentScreen === 'tracking' && analysisData && (
                <MonthlyTracking
                  goalLabel={analysisData.goalLabel}
                  targetAmount={analysisData.targetAmount}
                  currentSavings={analysisData.currentSavings}
                  monthlySavings={monthlySavings}
                  onUpdateIncomeExpense={() => setCurrentScreen('update')}
                  onViewForecast={() => setCurrentScreen('forecast')}
                  onBack={() => setCurrentScreen('progress')}
                />
              )}

              {currentScreen === 'update' && analysisData && (
                <UpdateIncomeExpense
                  previousIncome={analysisData.monthlyIncome}
                  previousExpense={analysisData.monthlyExpense}
                  onSave={handleUpdateIncome}
                  onBack={() => setCurrentScreen('tracking')}
                />
              )}

              {currentScreen === 'forecast' && analysisData && (
                <FutureForecast
                  goalLabel={analysisData.goalLabel}
                  targetAmount={analysisData.targetAmount}
                  currentSavings={analysisData.currentSavings}
                  currentMonthlySavings={monthlySavings}
                  onApplyScenario={handleApplyScenario}
                  onConsultExpert={() => setCurrentScreen('expertList')}
                  onBack={() => setCurrentScreen('tracking')}
                  onBackHome={() => setCurrentScreen('home')}
                />
              )}

              {currentScreen === 'consulting' && (
                <ConsultingSupport
                  goal={mockGoal}
                  monthlyIncome={analysisData?.monthlyIncome || 0}
                  onComplete={() => setCurrentScreen('tracking')}
                />
              )}

              {currentScreen === 'expertList' && (
                <ExpertConsulting
                  onBookExpert={() => setCurrentScreen('bookExpert')}
                  onBack={() => setCurrentScreen('home')}
                />
              )}

              {currentScreen === 'bookExpert' && (
                <BookExpert
                  onConfirm={() => setCurrentScreen('bookingConfirm')}
                  onBack={() => setCurrentScreen('expertList')}
                />
              )}

              {currentScreen === 'bookingConfirm' && bookingData && (
                <BookingConfirmation
                  expertName={bookingData.expertName}
                  date={bookingData.date}
                  time={bookingData.time}
                  onBackToHome={() => setCurrentScreen('home')}
                />
              )}

              {currentScreen === 'checkin' && (
                <DailyCheckIn onBackHome={() => setCurrentScreen('home')} />
              )}

              {currentScreen === 'forum' && (
                <Forum
                  onBackHome={() => setCurrentScreen('home')}
                  onViewThread={(forumId, threadId) => {
                    setSelectedForumId(forumId);
                    setSelectedThreadId(threadId);
                    setCurrentScreen('threadDetail');
                  }}
                  onCreatePost={(forumId) => {
                    setSelectedForumId(forumId);
                    setCurrentScreen('createPost');
                  }}
                />
              )}

              {currentScreen === 'createPost' && selectedForumId && (
                <CreatePost
                  onBack={() => setCurrentScreen('forum')}
                  forumId={selectedForumId}
                  forumName={forumMetadata[selectedForumId]?.name || ''}
                  forumColor={forumMetadata[selectedForumId]?.color || ''}
                />
              )}

              {currentScreen === 'threadDetail' && selectedForumId && selectedThreadId && (
                <ThreadDetail
                  onBack={() => setCurrentScreen('forum')}
                  threadId={selectedThreadId}
                  forumName={forumMetadata[selectedForumId]?.name || ''}
                  forumColor={forumMetadata[selectedForumId]?.color || ''}
                />
              )}

              {currentScreen === 'aichat' && (
                <AIChatbot onBackHome={() => setCurrentScreen('home')} />
              )}

              {currentScreen === 'history' && (
                <History
                  onBackHome={() => setCurrentScreen('home')}
                  onViewDetail={(consultationId) => {
                    console.log('View consultation detail:', consultationId);
                  }}
                />
              )}

              {currentScreen === 'notifications' && (
                <Notifications onBackHome={() => setCurrentScreen('home')} />
              )}

              {currentScreen === 'profile' && (
                <Profile 
                  onBackHome={() => setCurrentScreen('home')} 
                  onSettings={() => setCurrentScreen('settings')}
                />
              )}

              {currentScreen === 'statistics' && (
                <Statistics onBackHome={() => setCurrentScreen('home')} />
              )}

              {currentScreen === 'budget' && (
                <BudgetManager onBackHome={() => setCurrentScreen('home')} />
              )}

              {currentScreen === 'settings' && (
                <Settings 
                  onBackHome={() => setCurrentScreen('home')}
                  onBack={() => setCurrentScreen('profile')}
                  onPersonalInfo={() => setCurrentScreen('personalInfo')}
                  onChangePassword={() => setCurrentScreen('changePassword')}
                  onHelpCenter={() => setCurrentScreen('helpCenter')}
                  onContactSupport={() => setCurrentScreen('contactSupport')}
                  onTermsOfService={() => setCurrentScreen('termsOfService')}
                  onPrivacyPolicy={() => setCurrentScreen('privacyPolicy')}
                  onLogout={handleLogout}
                />
              )}

              {currentScreen === 'tools' && (
                <FinancialTools onBackHome={() => setCurrentScreen('home')} />
              )}

              {currentScreen === 'personalInfo' && (
                <PersonalInfo onBack={() => setCurrentScreen('settings')} />
              )}

              {currentScreen === 'changePassword' && (
                <ChangePassword onBack={() => setCurrentScreen('settings')} />
              )}

              {currentScreen === 'helpCenter' && (
                <HelpCenter onBack={() => setCurrentScreen('settings')} />
              )}

              {currentScreen === 'contactSupport' && (
                <ContactSupport onBack={() => setCurrentScreen('settings')} />
              )}

              {currentScreen === 'termsOfService' && (
                <TermsOfService onBack={() => setCurrentScreen('settings')} />
              )}

              {currentScreen === 'privacyPolicy' && (
                <PrivacyPolicy onBack={() => setCurrentScreen('settings')} />
              )}
            </>
          )}
        </div>
        
        {/* Bottom Navigation - Only show when authenticated */}
        {isAuthenticated && (
          <BottomNavigation
            currentScreen={currentScreen}
            setCurrentScreen={setCurrentScreen}
          />
        )}
      </div>
    </div>
  );
}