import { useState, useEffect } from 'react';

/**
 * localStorageを使った永続化フック
 * @param {string} key - localStorageのキー
 * @param {any} initialValue - 初期値
 * @returns {[any, function]} - 値と更新関数のタプル
 */
const useLocalStorage = (key, initialValue) => {
  // 初期値の取得（localStorageから読み込むか、初期値を使用）
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('localStorageからの読み込みエラー:', error);
      return initialValue;
    }
  });

  // 値が変更されたらlocalStorageに保存
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('localStorageへの保存エラー:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

export default useLocalStorage;
