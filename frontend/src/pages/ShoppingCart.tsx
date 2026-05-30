import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface StarIcon {
  icon: string;
  fill: boolean;
}

interface CartItem {
  id: string;
  title: string;
  author: string;
  rating: number;
  reviewsCount: string;
  duration: string;
  lectures: number;
  level: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  imageUrl: string;
  stars: StarIcon[];
}

const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: 'c1_java_beg',
    title: 'Java Programming for Complete Beginners',
    author: 'in28Minutes',
    rating: 4.6,
    reviewsCount: '53k',
    duration: '60.5h',
    lectures: 732,
    level: 'Beginner',
    price: 379000,
    originalPrice: 2139000,
    discountPercentage: 82,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhtYZDx8d70kL8xe3qnk-oeCGLejKW9UZ16H659ZDdlq31H7gKSgLpqV5_NZX1mQ05DQM1zPqstOP1_8tvRTJaBJxFeLj8PX0BimRUezyRE2JLPnMH1izLP8dCs2uKl6rsFxV1NkxiSdmJepioIqxz4d7MEVtoq4t0whf4NCOLW5WLAWUkEKIBxk19Ojtv8ythp0bInWWd8DJgmtk7b1D2eM-d4Y_eyX0bo3ZOU6L5bvkPAygMZwJ156ABJc8tfr4F7txvGwheFLQ',
    stars: [
      { icon: 'star', fill: true },
      { icon: 'star', fill: true },
      { icon: 'star', fill: true },
      { icon: 'star', fill: true },
      { icon: 'star_half', fill: true }
    ]
  },
  {
    id: 'c2_java_master',
    title: 'Java Masterclass 2025',
    author: 'Tim Buchalka',
    rating: 4.6,
    reviewsCount: '213k',
    duration: '135.5h',
    lectures: 739,
    level: 'All Levels',
    price: 409000,
    originalPrice: 2499000,
    discountPercentage: 83,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRO6E3aPtPZPC5fp6pW5XSjS26sTmj8K8cF6v_eVZlq6e46gHgx5UoYoc5lCQPEWpd3blmJD_QfO68NWzlKHd2g94x3629t3dRbp9PVC72Ik8o6Q-CPdlCfmsn4heh_iSMl5YlcHl9aDsBS4HihxXR2KKZO266xVqg4bR0uh80V0RG483YkJIDKBU_vu0XpjDMbHFiyIvfMJqfspQ3UpMT4A3RTXujjmUA_6JA8pkcaeTv0BP98kmV78AdpVcIlG2QWLHON_lmqGY',
    stars: [
      { icon: 'star', fill: true },
      { icon: 'star', fill: true },
      { icon: 'star', fill: true },
      { icon: 'star', fill: true },
      { icon: 'star_half', fill: true }
    ]
  },
  {
    id: 'c3_java_backend',
    title: 'Lập trình Java Backend Full Steps',
    author: 'Tây Java',
    rating: 4.4,
    reviewsCount: '78',
    duration: '20h',
    lectures: 25,
    level: 'All Levels',
    price: 279000,
    originalPrice: 1179000,
    discountPercentage: 76,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbOyWsUO6H6SKRKwdort_nghveay6OX1ocDLCmXJHHNd8HrsxBJ44dHPawRPBVQOlLiyZG4nkQXQ6y8eMGpts9FMOnuj9Sw0_AEDIujRvB23OD6njiGFx5GxmZxEdUEd7hPqdyZYbifTGwrlnH3uyes3S_aFal7Yk7vcY43zXpd89VTgO4r8p88c8V32ipTPtzZxWyysKUz73sNb0F3ExYoHSmr6S0C2G0KcfUJu2ultLotwOUlvzyUtmbosd_Hhn-m9woBH4A_vk',
    stars: [
      { icon: 'star', fill: true },
      { icon: 'star', fill: true },
      { icon: 'star', fill: true },
      { icon: 'star', fill: true },
      { icon: 'star_border', fill: false }
    ]
  }
];

export const ShoppingCart: React.FC = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [walletBalance, setWalletBalance] = useState(1500000);
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0); // extra discount in percent
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const subTotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const originalTotal = cartItems.reduce((sum, item) => sum + item.originalPrice, 0);
  
  // Calculate final total based on standard items price and the applied coupon discount
  const finalTotal = subTotal * (1 - couponDiscount / 100);

  // Recalculate total discount percentage dynamically
  const averageDiscountPercent = originalTotal > 0 
    ? Math.round(((originalTotal - finalTotal) / originalTotal) * 100) 
    : 0;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'NONSTOP20') {
      setCouponDiscount(20);
      setErrorMessage('');
      setSuccessMessage('Coupon NONSTOP20 applied: 20% discount!');
    } else if (couponCode.trim() === '') {
      setErrorMessage('Please enter a coupon code.');
      setSuccessMessage('');
    } else {
      setErrorMessage('Invalid Coupon Code! Try "NONSTOP20"');
      setSuccessMessage('');
    }
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      setErrorMessage('Giỏ hàng của bạn đang trống.');
      setSuccessMessage('');
      return;
    }

    if (walletBalance < finalTotal) {
      setErrorMessage('Không đủ số dư ví! Vui lòng nạp thêm tiền để thực hiện giao dịch.');
      setSuccessMessage('');
      return;
    }

    setWalletBalance(prev => prev - finalTotal);
    setSuccessMessage('Thanh toán thành công! Khóa học đã được đăng ký vào tài khoản của bạn.');
    setErrorMessage('');
    setCartItems([]);
    setTimeout(() => {
      navigate('/dashboard');
    }, 2500);
  };

  return (
    <div className="relative z-10 flex-grow w-full max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-xxl pt-8 flex flex-col gap-xl text-left">
      {/* Decorative Badge */}
      <div className="inline-flex items-center gap-1.5 bg-[#fce2d3] border border-primary/20 px-3 py-1 rounded-full text-primary font-bold text-xs uppercase tracking-wider mb-3 shadow-sm relative z-10 w-fit">
        <span className="material-symbols-outlined text-xs icon-fill">shopping_cart</span> Cart Arena
      </div>
      
      <h1 className="text-display-lg-mobile md:text-display-lg font-display font-black leading-tight relative z-10">
        <span className="bg-gradient-to-r from-[#0114a7] to-[#2563eb] bg-clip-text text-transparent">Shopping</span>{' '}
        <span className="bg-gradient-to-r from-[#ff6000] to-[#ff8c42] bg-clip-text text-transparent">Cart</span>
      </h1>

      {successMessage && (
        <div className="bg-green-50 border border-brand-green/30 text-brand-green p-4 rounded-xl text-left font-bold flex items-center gap-2 animate-fade-in shadow-sm relative z-10">
          <span className="material-symbols-outlined text-[20px] icon-fill">check_circle</span>
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-left font-bold flex items-center gap-2 animate-fade-in shadow-sm relative z-10">
          <span className="material-symbols-outlined text-[20px]">error</span>
          {errorMessage}
        </div>
      )}

      {cartItems.length === 0 && !successMessage ? (
        <div className="bg-surface rounded-2xl border border-gray-150 p-12 text-center flex flex-col items-center justify-center gap-4 shadow-sm relative z-10">
          <div className="w-16 h-16 rounded-full bg-gray-100 text-text-muted flex items-center justify-center">
            <span className="material-symbols-outlined text-4xl">shopping_cart_off</span>
          </div>
          <h3 className="font-display font-black text-xl text-brand-blue">Giỏ hàng của bạn đang trống</h3>
          <p className="font-body text-sm text-text-muted max-w-sm">Hãy khám phá các khóa học công nghệ đỉnh cao và tìm kiếm kiến thức phù hợp với mục tiêu của bạn.</p>
          <Link to="/courses" className="bg-primary hover:bg-primary-hover text-white font-bold text-sm uppercase px-6 py-3 rounded-xl transition-all shadow-md">
            Khám phá khóa học
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-gutter items-start">
          {/* Left Column: Cart Items */}
          <div className="w-full lg:w-[70%] space-y-md">
            {cartItems.map((item) => (
              <div 
                key={item.id} 
                className="bg-surface rounded-lg p-md shadow-sm border border-outline-variant/30 flex flex-col sm:flex-row gap-md items-start group hover:-translate-y-1 transition-transform duration-300 hover:shadow-md"
              >
                <div className="w-full sm:w-40 aspect-video sm:aspect-square rounded bg-surface-gray overflow-hidden relative shrink-0">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                    alt={item.title} 
                    src={item.imageUrl} 
                  />
                </div>
                <div className="flex-grow flex flex-col justify-between min-h-[160px]">
                  <div>
                    <h3 className="font-headline-md text-body-lg font-semibold text-text-main mb-xs">{item.title}</h3>
                    <p className="font-body-md text-caption text-text-muted mb-sm">by {item.author}</p>
                    <div className="flex items-center space-x-xs mb-sm">
                      <span className="font-label-md text-label-md text-text-main">{item.rating}</span>
                      <div className="flex text-[#f9bf02]">
                        {item.stars.map((star, idx) => (
                          <span 
                            key={idx} 
                            className={`material-symbols-outlined text-[16px] ${star.fill ? 'icon-fill' : ''}`}
                          >
                            {star.icon}
                          </span>
                        ))}
                      </div>
                      <span className="font-body-md text-caption text-text-muted">({item.reviewsCount})</span>
                    </div>
                    <div className="flex flex-wrap gap-sm font-body-md text-caption text-text-muted">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">schedule</span> 
                        {item.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">menu_book</span> 
                        {item.lectures} lectures
                      </span>
                      <span>• {item.level}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-md mt-md text-sm">
                    <button 
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-primary hover:text-primary-hover font-label-md text-caption underline cursor-pointer"
                    >
                      Remove
                    </button>
                    <button className="text-text-muted hover:text-text-main font-label-md text-caption">Save for later</button>
                    <button className="text-text-muted hover:text-text-main font-label-md text-caption">Move to wishlist</button>
                  </div>
                </div>
                <div className="flex flex-col items-end shrink-0 sm:pl-md border-t sm:border-t-0 sm:border-l border-outline-variant/30 pt-md sm:pt-0 w-full sm:w-auto">
                  <span className="font-headline-md text-headline-md text-primary font-bold">
                    {item.price.toLocaleString('vi-VN')}đ
                  </span>
                  <span className="font-body-md text-caption text-text-muted line-through">
                    {item.originalPrice.toLocaleString('vi-VN')}đ
                  </span>
                  <span className="bg-red-100 text-red-700 font-caption text-caption px-2 py-1 rounded mt-xs font-semibold">
                    Discount {item.discountPercentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Summary Sticky Card */}
          <div className="w-full lg:w-[30%] lg:sticky lg:top-24">
            <div className="bg-surface rounded-lg p-lg shadow-sm border border-outline-variant/30 space-y-md">
              <div className="space-y-sm">
                <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-4">
                  <div className="flex items-center gap-2 text-text-muted">
                    <span className="material-symbols-outlined text-[20px] text-primary">account_balance_wallet</span>
                    <span className="font-medium text-sm">My Wallet:</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="font-bold text-brand-green tracking-tight">
                      {walletBalance.toLocaleString('vi-VN')}đ
                    </div>
                    <Link 
                      to="/dashboard#deposit" 
                      className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors px-2.5 py-1 rounded text-xs font-semibold whitespace-nowrap"
                    >
                      Deposit
                    </Link>
                  </div>
                </div>
                <div className="font-label-md text-body-md text-text-muted">Total:</div>
                <div className="font-display-lg-mobile text-display-lg-mobile font-bold text-text-main tracking-tight">
                  {finalTotal.toLocaleString('vi-VN')}đ
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-body-md text-body-md text-text-muted line-through">
                    {originalTotal.toLocaleString('vi-VN')}đ
                  </span>
                  <span className="text-red-600 font-label-md text-label-md font-semibold">
                    Discount {averageDiscountPercent}%
                  </span>
                </div>
              </div>
              
              <button 
                onClick={handleCheckout}
                className="w-full bg-primary hover:bg-primary-hover text-white font-label-md text-label-md py-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 flex justify-center items-center gap-sm font-bold cursor-pointer"
              >
                Checkout
              </button>
              
              <div className="pt-md border-t border-outline-variant/30">
                <form onSubmit={handleApplyCoupon} className="flex relative">
                  <input 
                    className="w-full bg-surface text-text-main font-body-md text-body-md rounded-l-md border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary px-sm py-2 outline-none" 
                    placeholder="Apply Coupon" 
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button 
                    className="bg-brand-blue hover:bg-brand-blue-light text-white rounded-r-md px-md flex items-center transition-colors cursor-pointer" 
                    type="submit"
                  >
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
