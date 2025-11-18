// Công thức tính toán tài chính

// Tính giá trị tương lai (Future Value) với lãi kép
export function calculateFutureValue(
  principal: number,
  rate: number,
  years: number
): number {
  return principal * Math.pow(1 + rate / 100, years);
}

// Tính số tiền cần tiết kiệm hàng tháng (PMT - Payment)
export function calculateMonthlyPayment(
  futureValue: number,
  rate: number,
  years: number,
  currentSavings: number = 0
): number {
  const monthlyRate = rate / 100 / 12;
  const months = years * 12;
  
  // Giá trị tương lai của số tiền hiện có
  const fvCurrentSavings = currentSavings * Math.pow(1 + monthlyRate, months);
  
  // Số tiền còn thiếu
  const remaining = futureValue - fvCurrentSavings;
  
  if (remaining <= 0) return 0;
  
  // Công thức niên kim: PMT = [FV × r] / [(1 + r)^n - 1]
  const pmt = (remaining * monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1);
  
  return pmt;
}

// Áp dụng quy tắc 50/30/20
export function apply503020Rule(monthlyIncome: number) {
  return {
    needs: monthlyIncome * 0.5, // Nhu cầu thiết yếu
    wants: monthlyIncome * 0.3, // Mong muốn
    savings: monthlyIncome * 0.2, // Tiết kiệm/đầu tư
  };
}

// Tính quỹ khẩn cấp
export function calculateEmergencyFund(monthlyExpenses: number) {
  return {
    min: monthlyExpenses * 3,
    max: monthlyExpenses * 6,
  };
}

// Tính điểm gamification
export function calculatePoints(savedAmount: number): number {
  return Math.floor(savedAmount / 1000000) * 100; // 100 điểm mỗi 1 triệu VND
}

// Kiểm tra huy hiệu
export function checkBadges(progress: number): string[] {
  const badges: string[] = [];
  if (progress >= 10) badges.push('Người mới bắt đầu');
  if (progress >= 25) badges.push('Tiết kiệm viên tích cực');
  if (progress >= 50) badges.push('Tiết kiệm viên cấp 1');
  if (progress >= 75) badges.push('Chuyên gia tiết kiệm');
  if (progress >= 100) badges.push('Bậc thầy tài chính');
  return badges;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
}
