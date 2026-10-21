import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './Header.css';
import { megaMenuData, categoriesData } from '../../data/mockData';
import { getSubcategoryNames } from '../../utils/categoryUtils';
import {
  DEFAULT_HEADER_NAV_ITEMS,
  DEFAULT_OCCASION_MENU_DATA,
  DEFAULT_CORPORATE_MENU_DATA
} from '../../data/headerFooterData';
import logoImg from '../../assets/Gift-Studio-Logo.webp';

export default function Header({
  headerContent = null,
  cartCount = 0,
  wishlistCount = 0,
  user = null,
  categories = [],
  activePath = '/',
  onSearch = () => {},
  onNavigate = () => {},
  onLogout = () => {},
  onOpenCart = () => {},
  onOpenWishlist = () => {},
  onOpenAccount = () => {},
  onOpenAuth = () => {}
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileMega, setOpenMobileMega] = useState(null);
  const [openMobileSubCat, setOpenMobileSubCat] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState({ id: 'all', name: 'All categories' });
  const [isCatDropdownOpen, setIsCatDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSearchQuery, setMobileSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [mounted, setMounted] = useState(false);
  const catDropdownRef = useRef(null);
  const headerRef = useRef(null);

  const displayCategories = categories && categories.length > 0 ? categories : categoriesData;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Track window scroll to enhance sticky/fixed header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Measure exact header height to keep page content seamlessly positioned
  useEffect(() => {
    const updateHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);

    let ro;
    if (typeof ResizeObserver !== 'undefined' && headerRef.current) {
      ro = new ResizeObserver(() => updateHeight());
      ro.observe(headerRef.current);
    }
    return () => {
      window.removeEventListener('resize', updateHeight);
      if (ro) ro.disconnect();
    };
  }, [headerContent]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (catDropdownRef.current && !catDropdownRef.current.contains(e.target)) {
        setIsCatDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open & close on Escape
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setOpenMobileMega(null);
      setOpenMobileSubCat(null);
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  const handleMobileMegaToggle = (key) => {
    setOpenMobileMega((prev) => (prev === key ? null : key));
  };

  const handleMobileSubToggle = (key) => {
    setOpenMobileSubCat((prev) => (prev === key ? null : key));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ query: searchQuery, categoryId: selectedCategory.id });
    }
  };

  const handleMobileSearchSubmit = (e) => {
    e.preventDefault();
    if (!mobileSearchQuery.trim()) return;
    setIsMobileMenuOpen(false);
    if (onSearch) {
      onSearch({ query: mobileSearchQuery.trim(), categoryId: 'all' });
    }
  };

  const handleNavLinkClick = (url) => {
    setIsMobileMenuOpen(false);
    if (!url) return;
    if (url.startsWith('http://') || url.startsWith('https://')) {
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }
    if (url === '/cart' && onOpenCart) {
      onOpenCart();
      return;
    }
    if (url === '/wishlist' && onOpenWishlist) {
      onOpenWishlist();
      return;
    }
    if ((url === '/login-register' || url === '/login' || url === '/signup') && onOpenAuth) {
      onOpenAuth(url === '/signup' ? 'signup' : 'login');
      return;
    }
    if (url === '/admin' || url === '#admin') {
      if (onNavigate) onNavigate('/admin');
      return;
    }
    if (url === '/my-account' || url === '/dashboard' || url === '#account') {
      if (onNavigate) onNavigate('/my-account');
      return;
    }
    if (onNavigate) onNavigate(url);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`main-header-wrapper ${isScrolled ? 'is-sticky-active' : ''}`}
      >
      {/* ═════════════════════════════════════════════════════════ */}
      {/* 1. TOP ANNOUNCEMENT & UTILITY BAR (Vivid Magenta)       */}
      {/* ═════════════════════════════════════════════════════════ */}
      {headerContent?.visibility?.topBar !== false && (
        <div className="top-bar">
          <div className="container top-bar-container">
            {/* Left: USPs */}
            {headerContent?.visibility?.uspStrip !== false && (
              <div className="top-usp-group desktop-only">
                <span className="top-usp-item">
                  <i className="fa-solid fa-gift"></i>
                  <span>{headerContent?.topBar?.usp1 || 'Unique Gifts for Every Occasion'}</span>
                </span>
                <span className="top-pipe">|</span>
                <span className="top-usp-item">{headerContent?.topBar?.usp2 || 'Custom Design'}</span>
                <span className="top-pipe">|</span>
                <span className="top-usp-item">{headerContent?.topBar?.usp3 || 'Premium Quality'}</span>
                <span className="top-pipe">|</span>
                <span className="top-usp-item">{headerContent?.topBar?.usp4 || 'Fast Delivery'}</span>
              </div>
            )}

            {/* Right: Quick Links & Social Icons */}
            <div className="top-right-group">
              {headerContent?.visibility?.helpLink !== false && (
                <>
                  <a
                    href="#help"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavLinkClick('/contact');
                    }}
                    className="top-action-link"
                  >
                    <i className="fa-regular fa-circle-question"></i>
                    <span>{headerContent?.topBar?.helpText || 'Help'}</span>
                  </a>
                  <span className="top-pipe desktop-only">|</span>
                </>
              )}

              {user ? (
                <a
                  href="#account"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavLinkClick('/my-account');
                  }}
                  className="top-action-link desktop-only"
                  style={{ fontWeight: 700 }}
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name || 'Account'}
                      style={{ width: '18px', height: '18px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                  ) : (
                    <i className="fa-regular fa-user"></i>
                  )}
                  <span>Hi, {user.name ? user.name.split(' ')[0] : 'Account'}</span>
                </a>
              ) : (
                <div className="top-auth-links desktop-only" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <a
                    href="#login"
                    onClick={(e) => {
                      e.preventDefault();
                      if (onOpenAuth) onOpenAuth('login');
                    }}
                    className="top-action-link"
                  >
                    <i className="fa-solid fa-arrow-right-to-bracket"></i>
                    <span>Sign In</span>
                  </a>
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>/</span>
                  <a
                    href="#signup"
                    onClick={(e) => {
                      e.preventDefault();
                      if (onOpenAuth) onOpenAuth('signup');
                    }}
                    className="top-action-link"
                  >
                    <span>Sign Up</span>
                  </a>
                </div>
              )}

              {headerContent?.visibility?.socialIcons !== false && (
                <>
                  <span className="top-pipe desktop-only">|</span>
                  <div className="top-social-icons desktop-only">
                    <a href={headerContent?.socialLinks?.instagram || 'https://instagram.com'} target="_blank" rel="noreferrer" aria-label="Instagram">
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                    <a href={headerContent?.socialLinks?.facebook || 'https://facebook.com'} target="_blank" rel="noreferrer" aria-label="Facebook">
                      <i className="fa-brands fa-facebook-f"></i>
                    </a>
                    <a href={headerContent?.socialLinks?.pinterest || 'https://pinterest.com'} target="_blank" rel="noreferrer" aria-label="Pinterest">
                      <i className="fa-brands fa-pinterest-p"></i>
                    </a>
                    <a href={headerContent?.socialLinks?.youtube || 'https://youtube.com'} target="_blank" rel="noreferrer" aria-label="YouTube">
                      <i className="fa-brands fa-youtube"></i>
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════ */}
      {/* 2. MIDDLE BRAND, SEARCH & USER ACTIONS BAR               */}
      {/* ═════════════════════════════════════════════════════════ */}
      <div className="middle-bar">
        <div className="container middle-bar-inner">
          {/* Brand Logo & Mobile Trigger */}
          <div className="logo-wrapper">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleNavLinkClick('/');
              }}
              className="logo"
            >
              <img
                id="headerMainLogo"
                src={headerContent?.brand?.logoUrl || logoImg}
                alt={headerContent?.brand?.logoAlt || 'Fine Gift Studio'}
                onError={(e) => {
                  e.target.style.display = 'none';
                  const fallback = e.target.parentNode.querySelector('.logo-fallback');
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div className="logo-fallback" style={{ display: 'none' }}>
                <div className="logo-box-icon">
                  <i className="fa-solid fa-gift"></i>
                </div>
                <div className="logo-text-stack">
                  <div className="logo-title">{headerContent?.brand?.title || '+FINE GIFT STUDIO'}</div>
                  <div className="logo-subtitle">{headerContent?.brand?.subtitle || '— PRINT YOUR IDEAS —'}</div>
                </div>
              </div>
            </a>

            {/* Mobile Actions */}
            <div className="mobile-actions mobile-only">
              <a
                href="#cart"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavLinkClick('/cart');
                }}
                className="mobile-cart-btn"
                aria-label="Cart"
              >
                <i className="fa-solid fa-cart-shopping"></i>
                {cartCount > 0 && <span className="cart-badge-pink">{cartCount}</span>}
              </a>
              <button
                type="button"
                className="mobile-menu-btn"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                aria-label="Toggle Navigation"
              >
                <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
              </button>
            </div>
          </div>

          {/* Central Pill Search Bar */}
          <form className="pill-search-container desktop-only" onSubmit={handleSearchSubmit}>
            {/* Category Dropdown Selector */}
            <div className="search-category-dropdown" ref={catDropdownRef}>
              <button
                type="button"
                className="category-select-trigger"
                onClick={() => setIsCatDropdownOpen((prev) => !prev)}
              >
                <span>{selectedCategory.name}</span>
                <i className="fa-solid fa-chevron-down"></i>
              </button>

              {isCatDropdownOpen && (
                <div className="category-select-menu">
                  <button
                    type="button"
                    className="cat-menu-item"
                    onClick={() => {
                      setSelectedCategory({ id: 'all', name: 'All categories' });
                      setIsCatDropdownOpen(false);
                    }}
                  >
                    <span>All categories</span>
                  </button>
                  {displayCategories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      className="cat-menu-item"
                      onClick={() => {
                        setSelectedCategory(cat);
                        setIsCatDropdownOpen(false);
                      }}
                    >
                      <i className={cat.icon || 'fa-solid fa-gift'}></i>
                      <span>{cat.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="search-pipe-divider"></div>

            {/* Search Input Box with Leading Glass Icon */}
            <div className="search-input-wrapper">
              <i className="fa-solid fa-magnifying-glass search-leading-icon"></i>
              <input
                type="text"
                className="pill-search-input"
                placeholder={headerContent?.search?.placeholder || 'Search for personalised gifts...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Pink Search Submit Pill */}
            <button type="submit" className="search-submit-btn" aria-label="Search">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>

          {/* Right Header Action Items: Account / Wishlist / Cart */}
          <div className="header-actions-group desktop-only">
            {/* Account Link */}
            {user ? (
              <div className="account-dropdown-wrap">
                <a
                  href="#account"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavLinkClick('/my-account');
                  }}
                  className="header-action-item"
                >
                  <div className="action-circle-icon" style={{ overflow: 'hidden' }}>
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name || 'Account'}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                      />
                    ) : (
                      <i className="fa-regular fa-user"></i>
                    )}
                  </div>
                  <span className="action-label">{user.name ? user.name.split(' ')[0] : 'My Account'}</span>
                </a>
              </div>
            ) : (
              <a
                href="#login"
                onClick={(e) => {
                  e.preventDefault();
                  if (onOpenAuth) onOpenAuth('login');
                }}
                className="header-action-item"
              >
                <div className="action-circle-icon">
                  <i className="fa-regular fa-user"></i>
                </div>
                <span className="action-label">Sign In / Register</span>
              </a>
            )}

            {/* Wishlist Link */}
            <a
              href="#wishlist"
              onClick={(e) => {
                e.preventDefault();
                handleNavLinkClick('/wishlist');
              }}
              className="header-action-item"
            >
              <div className="action-circle-icon">
                <i className="fa-regular fa-heart"></i>
                {wishlistCount > 0 && <span className="action-badge-num">{wishlistCount}</span>}
              </div>
              <span className="action-label">Wishlist</span>
            </a>

            {/* Cart Button */}
            <a
              href="#cart"
              onClick={(e) => {
                e.preventDefault();
                handleNavLinkClick('/cart');
              }}
              className="header-action-item header-cart-item"
            >
              <div className="action-circle-icon cart-icon-circle">
                <i className="fa-solid fa-cart-shopping"></i>
                <span className="cart-badge-pink">{cartCount}</span>
              </div>
              <span className="action-label">Cart</span>
            </a>
          </div>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════ */}
      {/* 3. BOTTOM NAVIGATION BAR (Desktop Only)                   */}
      {/* ═════════════════════════════════════════════════════════ */}
      <div className="bottom-bar desktop-only">
        <div className="container bottom-bar-inner">
          <nav className="nav-tabs-container" id="mainNavigation">
            {/* Dynamic Navigation Tabs (Admin Configurable) */}
            {(headerContent?.navItems || DEFAULT_HEADER_NAV_ITEMS)
              .filter((item) => item.visible !== false)
              .map((item) => {
                if (item.type === 'dropdown-occasion') {
                  const occasionSections = headerContent?.occasionMenu?.sections || DEFAULT_OCCASION_MENU_DATA.sections;
                  return (
                    <div key={item.id} className="nav-tab-dropdown-wrap">
                      <button type="button" className="nav-tab-item nav-dropdown-btn">
                        {item.icon && <i className={item.icon}></i>}
                        <span>{item.label}</span>
                        <i className="fa-solid fa-chevron-down nav-chevron"></i>
                      </button>

                      <div className="mega-dropdown-menu occasion-mega-menu">
                        {occasionSections.map((sec, idx) => (
                          <div key={sec.id || idx} className="mega-section-col">
                            <h4 className="mega-col-title">{sec.heading}</h4>
                            <ul className="mega-links-list">
                              {(sec.links || []).map((lnk, lIdx) => (
                                <li key={lnk.id || lIdx}>
                                  <a
                                    href={lnk.url}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleNavLinkClick(lnk.url);
                                    }}
                                  >
                                    {lnk.name || lnk.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }

                if (item.type === 'dropdown-category') {
                  return (
                    <div key={item.id} className="nav-tab-dropdown-wrap">
                      <button type="button" className="nav-tab-item nav-dropdown-btn">
                        {item.icon && <i className={item.icon}></i>}
                        <span>{item.label}</span>
                        <i className="fa-solid fa-chevron-down nav-chevron"></i>
                      </button>

                      <div className="mega-dropdown-menu category-mega-menu">
                        <div className="mega-grid-categories">
                          {displayCategories.map((cat) => {
                            let subList = getSubcategoryNames(cat);
                            if ((cat.name || '').toLowerCase() === 'infants' && subList.length === 0) {
                              subList = ['Boys', 'Girls'];
                            }

                            return (
                              <div key={cat.id || cat.name} className="mega-cat-item-wrap">
                                <a
                                  href={`#cat-${cat.id || cat.name}`}
                                  className="mega-cat-card"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleNavLinkClick(`/category/${encodeURIComponent(cat.name)}`);
                                  }}
                                >
                                  <div className="mega-cat-icon">
                                    <i className={cat.icon || 'fa-solid fa-gift'}></i>
                                  </div>
                                  <div className="mega-cat-meta">
                                    <span className="mega-cat-name">{cat.name}</span>
                                    <small>{cat.count ? `${cat.count}+ Products` : 'Curated Studio Gifts'}</small>
                                  </div>
                                </a>
                                {subList.length > 0 && (
                                  <div className="mega-cat-subchips">
                                    {subList.map((sub) => (
                                      <button
                                        key={sub}
                                        type="button"
                                        className="mega-subchip-btn"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          handleNavLinkClick(`/category/${encodeURIComponent(cat.name)}?sub=${encodeURIComponent(sub)}`);
                                        }}
                                      >
                                        <i className="fa-solid fa-angle-right"></i> {sub}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        <div className="mega-menu-footer">
                          <a
                            href="#shop-all"
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavLinkClick('/shop');
                            }}
                          >
                            <span>Explore All Studio Categories &amp; Collections</span>
                            <i className="fa-solid fa-arrow-right"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                }

                if (item.type === 'dropdown-corporate') {
                  const corporateLinks = headerContent?.corporateMenu?.links || DEFAULT_CORPORATE_MENU_DATA.links;
                  return (
                    <div key={item.id} className="nav-tab-dropdown-wrap">
                      <button type="button" className="nav-tab-item nav-dropdown-btn">
                        {item.icon && <i className={item.icon}></i>}
                        <span>{item.label}</span>
                        <i className="fa-solid fa-chevron-down nav-chevron"></i>
                      </button>

                      <div className="mega-dropdown-menu simple-dropdown-menu">
                        <div className="dropdown-simple-list">
                          {corporateLinks.map((corp, cIdx) => (
                            <a
                              key={corp.id || cIdx}
                              href={corp.url || '#'}
                              onClick={(e) => {
                                e.preventDefault();
                                handleNavLinkClick(corp.url);
                              }}
                            >
                              {corp.icon && <i className={corp.icon}></i>} {corp.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }

                if (item.type === 'dropdown-nested' || item.type === 'dropdown-custom' || (Array.isArray(item.subItems) && item.subItems.length > 0)) {
                  const hasNestedLevel3 = (item.subItems || []).some((sub) => Array.isArray(sub.subItems) && sub.subItems.length > 0);
                  const isItemActive = item.path === '/'
                    ? activePath === '/'
                    : (activePath === item.path || (item.path && item.path !== '/' && activePath.startsWith(item.path)));

                  return (
                    <div key={item.id || item.label} className="nav-tab-dropdown-wrap">
                      <a
                        href={item.path || '#'}
                        className={`nav-tab-item nav-dropdown-btn ${isItemActive ? 'active-nav-pill' : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavLinkClick(item.path);
                        }}
                      >
                        {item.icon && <i className={item.icon}></i>}
                        <span>{item.label}</span>
                        <i className="fa-solid fa-chevron-down nav-chevron"></i>
                      </a>

                      {hasNestedLevel3 ? (
                        <div className="mega-dropdown-menu nested-categories-menu">
                          <div className="nested-categories-header">
                            <div className="nested-cat-title-wrap">
                              <i className={item.icon || 'fa-solid fa-child'}></i>
                              <strong>{item.label} Collection</strong>
                            </div>
                            <a
                              href={item.path || '#'}
                              className="nested-view-all-link"
                              onClick={(e) => {
                                e.preventDefault();
                                handleNavLinkClick(item.path);
                              }}
                            >
                              <span>Browse All {item.label}</span>
                              <i className="fa-solid fa-arrow-right"></i>
                            </a>
                          </div>

                          <div className="nested-categories-grid">
                            {(item.subItems || []).map((sub, sIdx) => (
                              <div key={sub.id || sIdx} className="nested-subcat-card">
                                <a
                                  href={sub.path || sub.url || '#'}
                                  className="nested-subcat-header"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleNavLinkClick(sub.path || sub.url);
                                  }}
                                >
                                  <div className="nested-subcat-icon">
                                    <i className={sub.icon || 'fa-solid fa-folder'}></i>
                                  </div>
                                  <div className="nested-subcat-text">
                                    <span className="nested-subcat-name">{sub.label}</span>
                                    <small className="nested-subcat-hint">View all {sub.label} gifts</small>
                                  </div>
                                  <i className="fa-solid fa-angle-right nested-subcat-arrow"></i>
                                </a>

                                {Array.isArray(sub.subItems) && sub.subItems.length > 0 && (
                                  <div className="nested-level3-list">
                                    {sub.subItems.map((lvl3, l3Idx) => (
                                      <a
                                        key={lvl3.id || l3Idx}
                                        href={lvl3.path || lvl3.url || '#'}
                                        className="nested-level3-item"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          handleNavLinkClick(lvl3.path || lvl3.url);
                                        }}
                                      >
                                        <i className={lvl3.icon || (lvl3.label === 'Boys' ? 'fa-solid fa-mars' : 'fa-solid fa-venus')}></i>
                                        <span>{lvl3.label}</span>
                                        <i className="fa-solid fa-angle-right level3-arrow"></i>
                                      </a>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>

                          <div className="nested-menu-footer">
                            <a
                              href={item.path || '#'}
                              onClick={(e) => {
                                e.preventDefault();
                                handleNavLinkClick(item.path);
                              }}
                            >
                              <span>Explore All Studio {item.label} Gifts &amp; Personalized Keepsakes</span>
                              <i className="fa-solid fa-arrow-right"></i>
                            </a>
                          </div>
                        </div>
                      ) : (
                        <div className="mega-dropdown-menu simple-dropdown-menu">
                          <div className="dropdown-simple-list">
                            <a
                              href={item.path || '#'}
                              className="dropdown-all-item"
                              onClick={(e) => {
                                e.preventDefault();
                                handleNavLinkClick(item.path);
                              }}
                            >
                              <i className="fa-solid fa-layer-group"></i>
                              <span>All {item.label}</span>
                              <i className="fa-solid fa-arrow-right" style={{ marginLeft: 'auto', fontSize: '11px', color: '#c40b90' }}></i>
                            </a>
                            <div className="dropdown-divider-line"></div>
                            {(item.subItems || []).map((sub, sIdx) => (
                              <a
                                key={sub.id || sIdx}
                                href={sub.path || sub.url || '#'}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleNavLinkClick(sub.path || sub.url);
                                }}
                              >
                                {sub.icon && <i className={sub.icon}></i>}
                                <span>{sub.label || sub.name}</span>
                                <i className="fa-solid fa-angle-right" style={{ marginLeft: 'auto', fontSize: '11px', color: '#cbd5e1' }}></i>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                if (item.type === 'dropdown-contact') {
                  return (
                    <div key={item.id} className="nav-tab-dropdown-wrap">
                      <button
                        type="button"
                        className={`nav-tab-item nav-dropdown-btn ${activePath === '/contact' ? 'active-nav-pill' : ''}`}
                      >
                        {item.icon && <i className={item.icon}></i>}
                        <span>{item.label}</span>
                        <i className="fa-solid fa-chevron-down nav-chevron"></i>
                      </button>

                      <div className="mega-dropdown-menu simple-dropdown-menu">
                        <div className="dropdown-simple-list">
                          <a href={headerContent?.contact?.phoneLink || 'tel:+910000000000'}>
                            <i className="fa-solid fa-phone-volume"></i> Direct Call: {headerContent?.contact?.phone || '(+91) 0000 000 000'}
                          </a>
                          <a href={headerContent?.contact?.whatsappLink || 'https://wa.me/910000000000'} target="_blank" rel="noreferrer">
                            <i className="fa-brands fa-whatsapp"></i> WhatsApp Live Chat
                          </a>
                          <a href="#contact-page" onClick={(e) => { e.preventDefault(); handleNavLinkClick('/contact'); }}>
                            <i className="fa-solid fa-envelope"></i> Send Message / Inquiry
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                }

                // Standard Link
                const isItemActive = item.path === '/'
                  ? activePath === '/'
                  : (activePath === item.path || (item.path && item.path !== '/' && activePath.startsWith(item.path)));

                return (
                  <a
                    key={item.id || item.label}
                    href={item.path || '#'}
                    className={`nav-tab-item ${isItemActive ? 'active-nav-pill' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavLinkClick(item.path);
                    }}
                  >
                    {item.icon && <i className={item.icon}></i>}
                    <span>{item.label}</span>
                  </a>
                );
              })}
          </nav>
        </div>
      </div>
    </header>

    {/* Spacer to maintain exact flow and prevent layout shift with fixed header */}
    <div
      className="header-fixed-spacer"
      style={{ height: headerHeight > 0 ? `${headerHeight}px` : undefined }}
      aria-hidden="true"
    />

    {/* Render Mobile Navigation Drawer directly into document.body to ensure it's always centered on visible screen */}
    {(() => {
      const drawerMarkup = (
        <div
          className={`mobile-nav-drawer-sheet ${isMobileMenuOpen ? 'drawer-open' : ''}`}
          aria-hidden={!isMobileMenuOpen}
        >
          {/* Backdrop */}
          <div
            className="mobile-drawer-backdrop"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Off-canvas Panel */}
          <div
            className="mobile-drawer-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
          >
          {/* 1. Drawer Header */}
          <div className="mobile-drawer-header">
            <div
              className="mobile-drawer-brand"
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleNavLinkClick('/');
              }}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={headerContent?.brand?.logoUrl || logoImg}
                alt={headerContent?.brand?.logoAlt || 'Fine Gift Studio'}
                className="mobile-drawer-logo"
              />
            </div>
            <button
              type="button"
              className="mobile-drawer-close-btn"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close navigation"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          {/* 2. Drawer Search */}
          <div className="mobile-drawer-search-wrap">
            <form className="mobile-drawer-search-form" onSubmit={handleMobileSearchSubmit}>
              <i className="fa-solid fa-magnifying-glass search-icon"></i>
              <input
                type="text"
                className="mobile-drawer-search-input"
                placeholder={headerContent?.search?.placeholder || 'Search gifts, mugs, personalized items...'}
                value={mobileSearchQuery}
                onChange={(e) => setMobileSearchQuery(e.target.value)}
              />
              {mobileSearchQuery && (
                <button
                  type="button"
                  style={{ background: 'none', border: 'none', color: '#94a3b8', padding: '4px', cursor: 'pointer', marginRight: '4px' }}
                  onClick={() => setMobileSearchQuery('')}
                  aria-label="Clear search"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
              <button type="submit" className="mobile-drawer-search-submit" aria-label="Submit search">
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </form>
          </div>

          {/* 3. User Authentication / Profile Banner */}
          <div className="mobile-drawer-auth-box">
            {user ? (
              <div className="mobile-drawer-user-card">
                <div
                  className="mobile-drawer-user-info"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (onOpenAccount) onOpenAccount();
                  }}
                >
                  <div className="mobile-drawer-user-avatar">
                    {(user.name || user.email || 'U')[0].toUpperCase()}
                  </div>
                  <div className="mobile-drawer-user-text">
                    <strong className="mobile-drawer-user-name">{user.name || user.email}</strong>
                    <span className="mobile-drawer-user-role">
                      {user.role === 'admin' ? 'Store Administrator' : 'Customer Account'}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className="mobile-drawer-logout-btn"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onLogout();
                  }}
                  title="Logout"
                >
                  <i className="fa-solid fa-right-from-bracket"></i>
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="mobile-drawer-guest-btns">
                <button
                  type="button"
                  className="mobile-drawer-btn-signin"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (onOpenAuth) onOpenAuth('login');
                  }}
                >
                  <i className="fa-solid fa-arrow-right-to-bracket"></i>
                  <span>Sign In</span>
                </button>
                <button
                  type="button"
                  className="mobile-drawer-btn-signup"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (onOpenAuth) onOpenAuth('signup');
                  }}
                >
                  <i className="fa-solid fa-user-plus"></i>
                  <span>Sign Up</span>
                </button>
              </div>
            )}
          </div>

          {/* 4. Scrollable Navigation Body */}
          <div className="mobile-drawer-nav-scroll">
            <span className="mobile-drawer-section-label">Explore Store</span>
            {(headerContent?.navItems || DEFAULT_HEADER_NAV_ITEMS)
              .filter((item) => item.visible !== false)
              .map((item) => {
                if (item.type === 'dropdown-occasion') {
                  const occasionSections = headerContent?.occasionMenu?.sections || DEFAULT_OCCASION_MENU_DATA.sections;
                  const isOpen = openMobileMega === 'occasion';
                  return (
                    <div key={item.id} className={`mobile-nav-accordion ${isOpen ? 'accordion-open' : ''}`}>
                      <button
                        type="button"
                        className="mobile-nav-link-row"
                        onClick={() => handleMobileMegaToggle('occasion')}
                      >
                        <i className={`item-icon ${item.icon || 'fa-solid fa-gift'}`}></i>
                        <span className="item-text">{item.label}</span>
                        <i className="fa-solid fa-chevron-down accordion-chevron"></i>
                      </button>

                      {isOpen && (
                        <div className="mobile-accordion-panel">
                          {occasionSections.map((sec, idx) => (
                            <div key={sec.id || idx} style={{ marginBottom: '8px' }}>
                              <div className="mobile-accordion-group-title">{sec.heading}</div>
                              {(sec.links || []).map((lnk, lIdx) => (
                                <a
                                  key={lnk.id || lIdx}
                                  href={lnk.url}
                                  className="mobile-accordion-link"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleNavLinkClick(lnk.url);
                                  }}
                                >
                                  <i className="fa-solid fa-angle-right" style={{ fontSize: '11px', color: '#c40b90' }}></i>
                                  <span>{lnk.name || lnk.label}</span>
                                </a>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                if (item.type === 'dropdown-category') {
                  const isOpen = openMobileMega === 'category';
                  return (
                    <div key={item.id} className={`mobile-nav-accordion ${isOpen ? 'accordion-open' : ''}`}>
                      <button
                        type="button"
                        className="mobile-nav-link-row"
                        onClick={() => handleMobileMegaToggle('category')}
                      >
                        <i className={`item-icon ${item.icon || 'fa-solid fa-table-cells-large'}`}></i>
                        <span className="item-text">{item.label}</span>
                        <i className="fa-solid fa-chevron-down accordion-chevron"></i>
                      </button>

                      {isOpen && (
                        <div className="mobile-accordion-panel">
                          {displayCategories.map((cat) => (
                            <a
                              key={cat.id || cat.name}
                              href={`#cat-${cat.id || cat.name}`}
                              className="mobile-accordion-link"
                              onClick={(e) => {
                                e.preventDefault();
                                handleNavLinkClick(`/category/${encodeURIComponent(cat.name)}`);
                              }}
                            >
                              <i className={cat.icon || 'fa-solid fa-gift'} style={{ color: '#c40b90', width: '16px', textAlign: 'center' }}></i>
                              <span>{cat.name}</span>
                              {cat.count && <small style={{ marginLeft: 'auto', color: '#94a3b8', fontSize: '11px' }}>{cat.count}</small>}
                            </a>
                          ))}
                          <a
                            href="#shop-all"
                            className="mobile-accordion-link"
                            style={{ fontWeight: 700, color: '#c40b90', borderTop: '1px solid #f1f5f9', marginTop: '4px', paddingTop: '8px' }}
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavLinkClick('/shop');
                            }}
                          >
                            <i className="fa-solid fa-arrow-right" style={{ color: '#c40b90' }}></i>
                            <span>View All Categories &amp; Products</span>
                          </a>
                        </div>
                      )}
                    </div>
                  );
                }

                if (item.type === 'dropdown-corporate') {
                  const corporateLinks = headerContent?.corporateMenu?.links || DEFAULT_CORPORATE_MENU_DATA.links;
                  const isOpen = openMobileMega === 'corporate';
                  return (
                    <div key={item.id} className={`mobile-nav-accordion ${isOpen ? 'accordion-open' : ''}`}>
                      <button
                        type="button"
                        className="mobile-nav-link-row"
                        onClick={() => handleMobileMegaToggle('corporate')}
                      >
                        <i className={`item-icon ${item.icon || 'fa-solid fa-briefcase'}`}></i>
                        <span className="item-text">{item.label}</span>
                        <i className="fa-solid fa-chevron-down accordion-chevron"></i>
                      </button>

                      {isOpen && (
                        <div className="mobile-accordion-panel">
                          {corporateLinks.map((corp, cIdx) => (
                            <a
                              key={corp.id || cIdx}
                              href={corp.url || '#'}
                              className="mobile-accordion-link"
                              onClick={(e) => {
                                e.preventDefault();
                                handleNavLinkClick(corp.url);
                              }}
                            >
                              {corp.icon ? <i className={corp.icon} style={{ color: '#c40b90' }}></i> : <i className="fa-solid fa-angle-right" style={{ color: '#c40b90' }}></i>}
                              <span>{corp.label}</span>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                if (item.type === 'dropdown-nested' || item.type === 'dropdown-custom' || (Array.isArray(item.subItems) && item.subItems.length > 0)) {
                  const customDropKey = item.id || `custom_${item.label}`;
                  const isOpen = openMobileMega === customDropKey;
                  return (
                    <div key={item.id || item.label} className={`mobile-nav-accordion ${isOpen ? 'accordion-open' : ''}`}>
                      <button
                        type="button"
                        className="mobile-nav-link-row"
                        onClick={() => handleMobileMegaToggle(customDropKey)}
                      >
                        <i className={`item-icon ${item.icon || 'fa-solid fa-gift'}`}></i>
                        <span className="item-text">{item.label}</span>
                        <i className="fa-solid fa-chevron-down accordion-chevron"></i>
                      </button>

                      {isOpen && (
                        <div className="mobile-accordion-panel">
                          {/* View All link */}
                          <a
                            href={item.path || '#'}
                            className="mobile-accordion-link mobile-accordion-link-all"
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavLinkClick(item.path);
                            }}
                          >
                            <i className="fa-solid fa-layer-group" style={{ color: '#c40b90' }}></i>
                            <span>View All {item.label}</span>
                            <i className="fa-solid fa-arrow-right" style={{ marginLeft: 'auto', color: '#c40b90', fontSize: '11px' }}></i>
                          </a>

                          {(item.subItems || []).map((sub, sIdx) => {
                            const hasSubLvl3 = Array.isArray(sub.subItems) && sub.subItems.length > 0;
                            const subKey = `${customDropKey}_${sub.id || sIdx}`;
                            const isSubOpen = openMobileSubCat === subKey;

                            if (hasSubLvl3) {
                              return (
                                <div key={sub.id || sIdx} className={`mobile-nested-sub-accordion ${isSubOpen ? 'nested-sub-open' : ''}`}>
                                  <button
                                    type="button"
                                    className="mobile-nested-sub-row"
                                    onClick={() => handleMobileSubToggle(subKey)}
                                  >
                                    <i className={sub.icon || 'fa-solid fa-folder'} style={{ color: '#c40b90', width: '16px' }}></i>
                                    <span>{sub.label}</span>
                                    <i className="fa-solid fa-chevron-down nested-sub-chevron"></i>
                                  </button>

                                  {isSubOpen && (
                                    <div className="mobile-nested-lvl3-panel">
                                      <a
                                        href={sub.path || sub.url || '#'}
                                        className="mobile-lvl3-link"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          handleNavLinkClick(sub.path || sub.url);
                                        }}
                                      >
                                        <i className="fa-solid fa-arrow-right" style={{ fontSize: '10px', color: '#c40b90' }}></i>
                                        <span>All {sub.label}</span>
                                      </a>
                                      {sub.subItems.map((lvl3, l3Idx) => (
                                        <a
                                          key={lvl3.id || l3Idx}
                                          href={lvl3.path || lvl3.url || '#'}
                                          className="mobile-lvl3-link"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleNavLinkClick(lvl3.path || lvl3.url);
                                          }}
                                        >
                                          <i className={lvl3.icon || (lvl3.label === 'Boys' ? 'fa-solid fa-mars' : 'fa-solid fa-venus')} style={{ fontSize: '11px', color: '#c40b90' }}></i>
                                          <span>{lvl3.label}</span>
                                        </a>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              );
                            }

                            return (
                              <a
                                key={sub.id || sIdx}
                                href={sub.path || sub.url || '#'}
                                className="mobile-accordion-link"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleNavLinkClick(sub.path || sub.url);
                                }}
                              >
                                {sub.icon ? <i className={sub.icon} style={{ color: '#c40b90', width: '16px', textAlign: 'center' }}></i> : <i className="fa-solid fa-angle-right" style={{ color: '#c40b90' }}></i>}
                                <span>{sub.label || sub.name}</span>
                              </a>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                if (item.type === 'dropdown-contact') {
                  const isOpen = openMobileMega === 'contact';
                  return (
                    <div key={item.id} className={`mobile-nav-accordion ${isOpen ? 'accordion-open' : ''}`}>
                      <button
                        type="button"
                        className="mobile-nav-link-row"
                        onClick={() => handleMobileMegaToggle('contact')}
                      >
                        <i className={`item-icon ${item.icon || 'fa-solid fa-phone'}`}></i>
                        <span className="item-text">{item.label}</span>
                        <i className="fa-solid fa-chevron-down accordion-chevron"></i>
                      </button>

                      {isOpen && (
                        <div className="mobile-accordion-panel">
                          <a href={headerContent?.contact?.phoneLink || 'tel:+910000000000'} className="mobile-accordion-link">
                            <i className="fa-solid fa-phone-volume" style={{ color: '#c40b90' }}></i>
                            <span>Call: {headerContent?.contact?.phone || '(+91) 0000 000 000'}</span>
                          </a>
                          <a href={headerContent?.contact?.whatsappLink || 'https://wa.me/910000000000'} target="_blank" rel="noreferrer" className="mobile-accordion-link">
                            <i className="fa-brands fa-whatsapp" style={{ color: '#25d366' }}></i>
                            <span>WhatsApp Live Chat</span>
                          </a>
                          <a
                            href="#contact-page"
                            className="mobile-accordion-link"
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavLinkClick('/contact');
                            }}
                          >
                            <i className="fa-solid fa-envelope" style={{ color: '#c40b90' }}></i>
                            <span>Send Message / Inquiry</span>
                          </a>
                        </div>
                      )}
                    </div>
                  );
                }

                // Standard Link
                const isItemActive = item.path === '/'
                  ? activePath === '/'
                  : (activePath === item.path || (item.path && item.path !== '/' && activePath.startsWith(item.path)));

                return (
                  <a
                    key={item.id || item.label}
                    href={item.path || '#'}
                    className={`mobile-nav-link-row ${isItemActive ? 'active-pill' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavLinkClick(item.path);
                    }}
                  >
                    <i className={`item-icon ${item.icon || 'fa-solid fa-circle'}`}></i>
                    <span className="item-text">{item.label}</span>
                    {item.id === 'nav_blog' && (
                      <span style={{ fontSize: '10px', background: '#fdf2f8', color: '#c40b90', fontWeight: 800, padding: '2px 8px', borderRadius: '20px', marginLeft: 'auto' }}>
                        NEW
                      </span>
                    )}
                  </a>
                );
              })}
          </div>

          {/* 5. Drawer Footer */}
          <div className="mobile-drawer-footer">
            <a
              href={headerContent?.contact?.whatsappLink || 'https://wa.me/910000000000'}
              target="_blank"
              rel="noreferrer"
              className="mobile-drawer-wa-cta"
            >
              <i className="fa-brands fa-whatsapp"></i>
              <span>Chat on WhatsApp</span>
            </a>

            <div className="mobile-drawer-quick-row">
              <a href={headerContent?.contact?.phoneLink || 'tel:+910000000000'} className="mobile-drawer-quick-item">
                <i className="fa-solid fa-phone"></i>
                <span>Direct Call</span>
              </a>
              <a
                href="#track-orders"
                className="mobile-drawer-quick-item"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavLinkClick('/orders');
                }}
              >
                <i className="fa-solid fa-box-open"></i>
                <span>My Orders</span>
              </a>
              <a
                href="#about"
                className="mobile-drawer-quick-item"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavLinkClick('/about-us');
                }}
              >
                <i className="fa-solid fa-circle-info"></i>
                <span>About Us</span>
              </a>
            </div>

            <div className="mobile-drawer-socials">
              <a href={headerContent?.socialLinks?.instagram || 'https://instagram.com'} target="_blank" rel="noreferrer" aria-label="Instagram">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href={headerContent?.socialLinks?.facebook || 'https://facebook.com'} target="_blank" rel="noreferrer" aria-label="Facebook">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href={headerContent?.socialLinks?.pinterest || 'https://pinterest.com'} target="_blank" rel="noreferrer" aria-label="Pinterest">
                <i className="fa-brands fa-pinterest-p"></i>
              </a>
              <a href={headerContent?.socialLinks?.youtube || 'https://youtube.com'} target="_blank" rel="noreferrer" aria-label="YouTube">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    );

    if (mounted && typeof document !== 'undefined' && document.body) {
      return createPortal(drawerMarkup, document.body);
    }
    return drawerMarkup;
  })()}
</>
);
}
