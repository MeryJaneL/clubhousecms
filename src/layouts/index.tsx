import { ReactNode } from 'react';
// components
import DashboardLayout from './dashboard';
import LogoOnlyLayout from './LogoOnlyLayout';
import MainFooter from './MainFooter';

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
  variant?: 'main' | 'dashboard' | 'logoOnly';
};

export default function Layout({ variant = 'dashboard', children }: Props) {
  if (variant === 'logoOnly') {
    return (
      <>
        <LogoOnlyLayout>
          {children} <MainFooter />
        </LogoOnlyLayout>
      </>
    );
  }

  return (
    <>
      <DashboardLayout>
        {children} <MainFooter />
      </DashboardLayout>
    </>
  );
}
