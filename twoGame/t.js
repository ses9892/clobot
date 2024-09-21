gsap.to('#intro_container', { opacity: 0, duration: 1,
    onStart: () => {
        document.querySelector('#intro_container').style.display = 'none';
    }
                               
  });