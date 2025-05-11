/* */
function showScene(id) {
  changeMusic(id);
  document.querySelectorAll('.scene, #intro').forEach(section => {
    section.classList.remove('active');
    section.style.display = 'none';
  });

  const nextScene = document.getElementById(id);
  if (nextScene) {
    nextScene.classList.add('active');
    nextScene.style.display = 'block';
  }
}

// Вставка імені та перехід до наступної сцени
function submitIntro(nextSceneId) {
  const name = document.getElementById("nameInput").value.trim();
  if (name !== "") {
    localStorage.setItem("userName", name);
    const reply = document.getElementById("guardReply");
    reply.innerText = 'Сторож: вибачте, вас вже чекають. Вам до кінця зали не повертаючи,там і будуть потрібні двері';
    showScene(nextSceneId);
  } else {
    alert("Будь ласка, введи своє ім'я!");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const savedName = localStorage.getItem("userName");
  const input = document.getElementById("nameInput");
  if (savedName && input) {
    input.value = savedName;
  }

  const music = document.getElementById("bgMusic");
  const button = document.getElementById("musicToggle");

  function fadeOut(audio, callback) {
    let vol = audio.volume;
    const step = 0.05;
    const fade = setInterval(() => {
      if (vol > 0.05) {
        vol -= step;
        audio.volume = vol;
      } else {
        clearInterval(fade);
        audio.pause();
        audio.volume = 1;
        if (callback) callback();
      }
    }, 100);
  }

  function fadeIn(audio, src) {
    audio.src = src;
    audio.volume = 0;
    audio.play().then(() => {
      let vol = 0;
      const step = 0.05;
      const fade = setInterval(() => {
        if (vol < 1) {
          vol += step;
          audio.volume = vol;
        } else {
          clearInterval(fade);
        }
      }, 100);
    }).catch(() => {});
  }

  button.addEventListener("click", (e) => {
    e.stopPropagation();
    if (music.paused) {
      music.play();
      button.innerText = "🔊 Увімкнено";
    } else {
      music.pause();
      button.innerText = "🔇 Вимкнено";
    }
  });

  document.body.addEventListener("click", () => {
    if (music.paused) {
      music.play();
    }
  }, { once: true });
});











  
function changeMusic(sceneId) {
  const music = document.getElementById("bgMusic");
  const musicMap = {
    "scene2": "./music/dragon_song.mp3",
    "scene3": "./music/wolf_town.mp3",
    "scene3t": "./music/find_secret_room.mp3",
    "scene4": "./music/elf_town.mp3",
    "scene5": "./music/fairy_song.mp3",
    "scene101": "./music/dvorf_cave.mp3",
    "scene100": "./music/start_song.mp3",
    "scene6": "./music/dvorf_song.mp3",
    "scene7": "./music/dragon_song.mp3"
  };
  const newSrc = musicMap[sceneId];
  if (newSrc && music.src.indexOf(newSrc) === -1) {
    music.pause();
    music.src = newSrc;
    music.load();
    music.play();
  }
}


window.addEventListener("load", () => {
    const fairy = document.getElementById("flyingFairy");
    if (!fairy) return;

    function moveFairy() {
      const maxX = window.innerWidth - fairy.clientWidth;
      const maxY = window.innerHeight - fairy.clientHeight;
      const x = Math.random() * maxX;
      const y = Math.random() * maxY;

      // создаём только визуальный шлейф, не дублируя саму фею
      const spark = document.createElement("img");
      spark.src = fairy.src;
      spark.style.opacity = "0.2";
      spark.style.pointerEvents = "none";
      spark.style.transition = "opacity 0.6s ease-out";
      spark.style.position = "absolute";
      spark.style.width = fairy.style.width;
      spark.style.transform = `translate(${x}px, ${y}px)`;
      spark.style.zIndex = "999";
      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 1000);

      fairy.style.transform = `translate(${x}px, ${y}px)`;
    }

    setInterval(moveFairy, 700);

    fairy.addEventListener("click", () => {
      showScene("scene5f");
    });
  });

