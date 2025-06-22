import { useState } from 'react';
import { useForm } from '@mantine/form';
import {
  TextInput,
  Button,
  PasswordInput,
  Stack,
  Title,
  Alert,
  Paper,
  Container
} from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from '../api/auth.api';
import { useQueryClient } from '@tanstack/react-query';

export function LoginPage() {
   const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      login: '',
      password: '',
    },

    validate: {
      login: (value: string) => (value.trim().length < 2 ? 'Логин должен содержать минимум 2 символа' : null),
      password: (value: string) => (value.length < 4 ? 'Пароль должен содержать минимум 4 символа' : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setError(null);
    setIsLoading(true);
    
    try {
      await authenticateUser(values.login, values.password);
      queryClient.clear();
      
      navigate('/');
      
    } catch (err: any) {
      setError(err.message || 'Во время входа произошла неизвестная ошибка.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container size="xs" mt={100}>
      <Title ta="center" order={2}>
        Добро пожаловать в Кошачий Pinterest
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            {error && (
              <Alert icon={<IconAlertCircle size="1rem" />} title="Ошибка входа" color="red" variant="light">
                {error}
              </Alert>
            )}

            <TextInput
              required
              label="Логин"
              placeholder="Введите ваш логин"
              {...form.getInputProps('login')}
            />

            <PasswordInput
              required
              label="Пароль"
              placeholder="Введите ваш пароль"
              {...form.getInputProps('password')}
            />

            <Button type="submit" loading={isLoading} fullWidth mt="xl">
              Войти / Зарегистрироваться
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
