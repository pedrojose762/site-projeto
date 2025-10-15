// app.js
// Login simples (cliente). Credenciais fixas para demonstração.
const auth = (function(){
  const TEST_EMAIL = 'usuario@iot.com';
  const TEST_PASSWORD = 'senha123';
  const STORAGE_KEY = 'iot_logged';

  function login(email, password){
    // validação simples
    if(email === TEST_EMAIL && password === TEST_PASSWORD){
      // salva sessão (sessionStorage)
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ email, ts: Date.now() }));
      return { ok: true };
    }
    return { ok: false, message: 'E-mail ou senha inválidos.'};
  }

  function logout(){
    sessionStorage.removeItem(STORAGE_KEY);
  }

  function isLoggedIn(){
    const s = sessionStorage.getItem(STORAGE_KEY);
    return !!s;
  }

  function getUserEmail(){
    const s = sessionStorage.getItem(STORAGE_KEY);
    if(!s) return null;
    try { return JSON.parse(s).email } catch(e){ return null; }
  }

  return { login, logout, isLoggedIn, getUserEmail };
})();

// Lógica para a página de login
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  if(loginForm){
    // se já estiver logado, ir direto pro dashboard
    if(auth.isLoggedIn()){
      window.location.href = 'dashboard.html';
      return;
    }

    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
      const res = auth.login(email, password);
      if(res.ok){
        window.location.href = 'dashboard.html';
      } else {
        alert(res.message || 'Erro ao autenticar.');
      }
    });
  }
});
