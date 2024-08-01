export interface Voc {
    id: number;
    english: string;
    german: string;
    status: number; // Leitner box number (1 to 5)
    reviewCount: number; // Number of reviews
    nextReviewDate: Date; // Next review date
}