import { useState, type SubmitEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/providers/useAuth';
import type { GreenApiCredentials } from '@/shared/api';
import styles from './LoginPage.module.css';

interface FormErrors {
  idInstance?: string;
  apiTokenInstance?: string;
  general?: string;
}

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');

  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!idInstance.trim()) {
      newErrors.idInstance = 'Введите ID Instance';
    }

    if (!apiTokenInstance.trim()) {
      newErrors.apiTokenInstance = 'Введите API Token Instance';
    }

    return newErrors;
  };

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const credentials: GreenApiCredentials = {
      idInstance: idInstance.trim(),
      apiTokenInstance: apiTokenInstance.trim(),
    };

    try {
      await login(credentials);

      navigate('/chat', { replace: true });
    } catch (error) {
      setErrors({
        general:
          error instanceof Error
            ? error.message
            : 'Не удалось подключиться к GREEN-API',
      });
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Max Messenger Client</h1>

          <p className={styles.description}>
            Подключитесь к GREEN-API, чтобы начать переписку в MAX.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label htmlFor="idInstance">
              ID Instance
            </label>

            <input
              id="idInstance"
              type="text"
              value={idInstance}
              onChange={(event) =>
                setIdInstance(event.target.value)
              }
              disabled={isLoading}
              autoComplete="username"
              placeholder="Введите ID Instance"
            />

            {errors.idInstance && (
              <span className={styles.error}>
                {errors.idInstance}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="apiTokenInstance">
              API Token Instance
            </label>

            <input
              id="apiTokenInstance"
              type="password"
              value={apiTokenInstance}
              onChange={(event) =>
                setApiTokenInstance(event.target.value)
              }
              disabled={isLoading}
              autoComplete="current-password"
              placeholder="Введите API Token Instance"
            />

            {errors.apiTokenInstance && (
              <span className={styles.error}>
                {errors.apiTokenInstance}
              </span>
            )}
          </div>

          {errors.general && (
            <div className={styles.generalError}>
              {errors.general}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Подключение...' : 'Подключиться'}
          </button>
        </form>
      </section>
    </main>
  );
}