document.addEventListener('DOMContentLoaded', function() {
  // FAQ toggle functionality
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = question ? question.querySelector('i') : null;
    
    if (question && answer && icon) {
      question.addEventListener('click', function() {
        // Close all other answers
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            const otherAnswer = otherItem.querySelector('.faq-answer');
            const otherIcon = otherItem.querySelector('.faq-question i');
            
            if (otherAnswer) otherAnswer.classList.add('hidden');
            if (otherIcon) {
              otherIcon.classList.remove('fa-chevron-up');
              otherIcon.classList.add('fa-chevron-down');
            }
          }
        });

        // Toggle current answer
        answer.classList.toggle('hidden');
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up');
      });
    }
  });
}); 