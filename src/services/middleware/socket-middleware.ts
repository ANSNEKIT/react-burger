import { userApi } from '@/api/auth.api';
import { isMessageError } from '@/types/guard';

import type { RootState } from '../store';
import type {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  Middleware,
} from '@reduxjs/toolkit';

export type WsActions<Resp, Send> = {
  connect: ActionCreatorWithPayload<string>;
  disconnect: ActionCreatorWithoutPayload;
  onConnecting?: ActionCreatorWithoutPayload;
  onClose?: ActionCreatorWithoutPayload;
  onOpen?: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<Resp>;
  sendMessage?: ActionCreatorWithPayload<Send>;
};

const RECONNECT_PERIOD = 5000;

export const socketMiddleware = <SResp, SSend>(
  wsActions: WsActions<SResp, SSend>,
  isWithTokenRefresh = false
): Middleware<Record<string, never>, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    const {
      connect,
      disconnect,
      onConnecting,
      onClose,
      onOpen,
      onError,
      onMessage,
      sendMessage,
    } = wsActions;
    const { dispatch } = store;
    let reconnectTimer: NodeJS.Timeout | 0 = 0;
    let isConnected = false;
    let url = '';

    return (next) => (action) => {
      if (connect.match(action)) {
        socket = new WebSocket(action.payload);
        url = action.payload;
        isConnected = true;

        onConnecting && dispatch(onConnecting());

        socket.onopen = (): void => {
          onOpen && dispatch(onOpen());
        };

        socket.onclose = (): void => {
          onClose && dispatch(onClose());

          if (isConnected) {
            reconnectTimer = setTimeout(() => {
              dispatch(connect(url));
            }, RECONNECT_PERIOD);
          }
        };

        socket.onerror = (evt): void => {
          console.log('err', evt);
          if (evt?.isTrusted) {
            return;
          }

          dispatch(onError('Error'));
        };

        socket.onmessage = (event): void => {
          const data = event.data as string;

          try {
            const parsedData = JSON.parse(data) as SResp | { message: string };

            if (
              isWithTokenRefresh &&
              isMessageError(parsedData) &&
              parsedData?.message === 'Invalid or missing token'
            ) {
              userApi
                .refreshToken()
                .then((refreshedData) => {
                  const wssUrl = new URL(url);
                  wssUrl.searchParams.set(
                    'token',
                    refreshedData.accessToken.replace('Bearer ', '')
                  );
                  dispatch(connect(wssUrl.toString()));
                })
                .catch((error) => {
                  dispatch(onError((error as Error).message));
                });

              dispatch(disconnect());

              return;
            }

            dispatch(onMessage(parsedData as SResp));
          } catch (error) {
            dispatch(onError((error as Error).message));
          }
        };

        return;
      }

      if (socket && disconnect.match(action)) {
        clearTimeout(reconnectTimer);
        isConnected = false;
        reconnectTimer = 0;
        socket.close();
        socket = null;

        return;
      }

      if (socket && sendMessage?.match(action)) {
        const { payload } = action;
        try {
          const stringifiedPayload = JSON.stringify(payload);
          socket.send(stringifiedPayload);
        } catch (error) {
          dispatch(onError((error as Error).message));
        }

        return;
      }

      return next(action);
    };
  };
};
