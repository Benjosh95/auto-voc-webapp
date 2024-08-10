import { Voc } from "../../types/voc";

// Leitner-Box system
export const updateVocStatus = (voc: Voc, performance: 'good' | 'medium' | 'bad'): Voc => {
    const today = new Date();
    const nextReviewDate = new Date(today);
  
    if (performance === 'good') {
      voc.status = Math.min(voc.status + 1, 5); // Move to the next box
    } else if (performance === 'bad') {
      voc.status = Math.max(voc.status - 1, 1); // Move to the previous box
    }
  
    // Schedule next review based on the Leitner box
    switch (voc.status) {
      case 1:
        nextReviewDate.setDate(today.getDate() + 1); // Review tomorrow
        break;
      case 2:
        nextReviewDate.setDate(today.getDate() + 3); // Review in 3 days
        break;
      case 3:
        nextReviewDate.setDate(today.getDate() + 7); // Review in a week
        break;
      case 4:
        nextReviewDate.setDate(today.getDate() + 14); // Review in 2 weeks
        break;
      case 5:
        nextReviewDate.setMonth(today.getMonth() + 1); // Review in a month
        break;
    }
  
    return {
      ...voc,
      reviewCount: voc.reviewCount + 1,
      nextReviewDate,
    };
  };
  