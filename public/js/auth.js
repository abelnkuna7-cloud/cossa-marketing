// ===== UI HELPERS =====
function showSignup() {
  document.getElementById('signupSection').style.display = 'block';
  document.getElementById('loginSection').style.display = 'none';
  document.getElementById('verifySection').style.display = 'none';
}

function showLogin() {
  document.getElementById('signupSection').style.display = 'none';
  document.getElementById('loginSection').style.display = 'block';
  document.getElementById('verifySection').style.display = 'none';
}

function showVerify() {
  document.getElementById('signupSection').style.display = 'none';
  document.getElementById('loginSection').style.display = 'none';
  document.getElementById('verifySection').style.display = 'block';
}

// ===== SIGN UP =====
document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const businessName = document.getElementById('businessName').value;
  const businessType = document.getElementById('businessType').value;

  const errorDiv = document.getElementById('errorMessage');
  errorDiv.classList.remove('show');

  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    await user.sendEmailVerification();

    const now = new Date();
    const trialEnd = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);

    await db.collection('businesses').add({
      ownerEmail: email,
      ownerName: email.split('@')[0],
      businessName: businessName,
      businessType: businessType,
      phone: '',
      country: 'South Africa',
      plan: 'free',
      status: 'active',
      trialEndsAt: trialEnd,
      subscriptionStartsAt: null,
      createdAt: now,
      updatedAt: now,
      features: {
        crmEnabled: true,
        emailMarketingEnabled: true,
        landingPagesEnabled: true,
        affiliateEnabled: true,
        analyticsEnabled: true
      },
      settings: {
        brandColor: '#FF6B35',
        logoUrl: '',
        timezone: 'Africa/Johannesburg',
        currency: 'ZAR'
      }
    });

    showVerify();

  } catch (error) {
    errorDiv.textContent = error.message;
    errorDiv.classList.add('show');
  }
});

// ===== LOGIN =====
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const errorDiv = document.getElementById('loginErrorMessage');
  errorDiv.classList.remove('show');

  try {
    await auth.signInWithEmailAndPassword(email, password);
    const user = auth.currentUser;

    if (user.emailVerified) {
      window.location.href = '/contacts';
    } else {
      showVerify();
    }

  } catch (error) {
    errorDiv.textContent = error.message;
    errorDiv.classList.add('show');
  }
});

// ===== RESEND VERIFICATION =====
async function resendVerification() {
  try {
    const user = auth.currentUser;
    if (user) {
      await user.sendEmailVerification();
      alert('Verification email sent! Check your inbox.');
    }
  } catch (error) {
    alert('Error: ' + error.message);
  }
}

// ===== AUTO REDIRECT IF ALREADY LOGGED IN =====
auth.onAuthStateChanged((user) => {
  if (user && user.emailVerified) {
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
      window.location.href = '/contacts';
    }
  }
});
