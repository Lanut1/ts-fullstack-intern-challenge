import { AppShell, Group, Button, useMantineTheme } from '@mantine/core';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { logoutUser } from '../../api/auth.api';

export function AppLayout() {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const tabs = [
    { value: '/', label: 'Все котики' },
    { value: '/favorites', label: 'Любимые котики' },
  ];

  return (
    <AppShell
      header={{ height: 60 }}
      styles={{header: {
        backgroundColor: theme.colors.blue[5],
      }}}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group gap="xs">
            {tabs.map(({ value, label }) => {
              const isActive = location.pathname === value;
              return (
                <Button
                  key={value}
                  variant={isActive ? 'filled' : 'subtle'}
                  color={isActive ? 'blue' : 'whitesmoke'}
                  onClick={() => navigate(value)}
                >
                  {label}
                </Button>
              );
            })}
          </Group>
          <Button variant="subtle" color='white' onClick={handleLogout}>
            Выйти
          </Button>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
