import { useSelector } from 'react-redux';

export function useProfiles() {
  const profiles = useSelector((state) => state.profiles);

  return [{ ...profiles }];
}
