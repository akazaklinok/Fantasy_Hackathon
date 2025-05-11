document.addEventListener("DOMContentLoaded", () => {
    const savedName = localStorage.getItem("userName");
    if (savedName) {
      document.getElementById("nameInput").value = savedName;
    }
  });
  
  function submitIntro() {
    const name = document.getElementById("nameInput").value.trim();
    const choice = document.getElementById("choiceInput").value;
  
    if (!name || !choice) {
      alert("Будь ласка, введи ім’я та обери варіант.");
      return;
    }
  
    localStorage.setItem("userName", name);
    document.getElementById("nameDisplay").innerText = name;
  
    let iskrykText = "";
    let tinkaText = "";
  
    switch (choice) {
      case "пригоди":
        iskrykText = "О-о-о, пригоди? Ти моя людина! Зараз щось вигадаємо!";
        tinkaText = "Тільки не забувай про обережність...";
        break;
      case "спокій":
        tinkaText = "Тобі до душі відпочинок? Це чудово. Я покажу тобі найзатишніші куточки.";
        iskrykText = "Якщо знудишся — скажи! Я завжди за веселощі!";
        break;
      case "магія":
        tinkaText = "Магія — наша сутність. Я покажу її справжнє обличчя.";
        iskrykText = "Вибухи це так круто! Не забудь про магічні вибухи!";
        break;
    }
  
    document.getElementById("iskrykReply").innerText = iskrykText;
    document.getElementById("tinkaReply").innerText = tinkaText;
  
    document.getElementById("intro").style.display = "none";
    document.getElementById("response").style.display = "block";
  
    // Анімація
    document.querySelectorAll(".dragon-block").forEach(block => {
      block.classList.add("fade-in");
    });
  }
function submitIntro() {
  const name = document.getElementById("nameInput").value.trim();
  const choice = document.getElementById("choiceInput").value;

  if (!name || !choice) {
    alert("Будь ласка, введи ім’я та обери варіант.");
    return;
  }

  localStorage.setItem("userName", name);
  document.getElementById("nameDisplay").innerText = name;
}
