export function usePlatform(): 'mac' | 'win' {
  return navigator.userAgent.toLowerCase().includes('mac') ? 'mac' : 'win';
}
