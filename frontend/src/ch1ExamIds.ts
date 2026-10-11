/**
 * CHAPTER 1 — EXAM & WORKSHOP ID CONFIGURATIONS
 * Covers Lessons 1-1, 1-2, 1-3, 1-4
 */

// ============================================================================
// 1. COMPREHENSIVE CHAPTER 1 EXAM (امتحان الشابتر الأول الشامل ع المنصة)
// Combines Curated MCQs + In-depth Written / Essay Questions
// ============================================================================

export const CH1_COMPREHENSIVE_MCQ_IDS = [
  // Lesson 1-1 (8 MCQs)
  "q1-1-c1",
  "q1-1-c2",
  "q1-1-c3",
  "q1-1-c4",
  "q1-1-h1",
  "q1-1-h2",
  "q1-1-wa1",
  "q1-1-qubit",

  // Lesson 1-2 (8 MCQs)
  "q1-2-c1",
  "q1-2-c2",
  "q1-2-h1",
  "q1-2-h2",
  "q1-2-wa2",
  "q1-2-wb1",
  "q1-2-wb3",
  "q1-2-wc1",

  // Lesson 1-3 (8 MCQs)
  "off_l3_c1_m2",
  "off_l3_h1_m2",
  "off_l3_c2_m2",
  "off_l3_h2_m2",
  "off_l3_wka_m1",
  "off_l3_wka_m2",
  "off_l3_wkb_m1",
  "off_l3_wkc_m1",

  // Lesson 1-4 (8 MCQs)
  "off_l4_c1_m2",
  "off_l4_h1_m1",
  "off_l4_h1_m2",
  "off_l4_c2_m1",
  "off_l4_c2_m2",
  "off_l4_h2_m1",
  "off_l4_h2_m2",
  "off_l4_wka_m4",
];

// High-Yield Comprehensive Written Questions for the Official Chapter 1 Exam (2 per lesson)
export const CH1_COMPREHENSIVE_WRITTEN_IDS = [
  // Lesson 1-1 (Moore's law math verification & Edge computing latency in autonomous driving)
  "ws_ch1_1_w1",
  "ws_ch1_1_w2",

  // Lesson 1-2 (Rule-based vs ML paradigms & AI Hallucination causes and safeguards)
  "ws_ch1_2_w1",
  "ws_ch1_2_w3",

  // Lesson 1-3 (Predictive maintenance IoT/ML architecture & Computer vision in oncology/augmented doctor)
  "ws_ch1_3_w1",
  "ws_ch1_3_w3",

  // Lesson 1-4 (Algorithmic bias root causes/technical remedies & Accountability dilemma in autonomous crashes)
  "ws_ch1_4_w1",
  "ws_ch1_4_w2",
];

// Backward-compatibility alias
export const CH1_EXAM_IDS = CH1_COMPREHENSIVE_MCQ_IDS;


// ============================================================================
// 2. CHAPTER 1 WORKSHOP & DEEP TRAINING POOL (تدريبات ورشة حل الشابتر كامل)
// Contains all 40 deep MCQs + all 40 deep Written questions
// ============================================================================

export const CH1_WORKSHOP_MCQ_IDS = [
  // Lesson 1-1 (10 MCQs)
  "deep_1_1_q1", "deep_1_1_q2", "deep_1_1_q3", "deep_1_1_q4", "deep_1_1_q5",
  "deep_1_1_q6", "deep_1_1_q7", "deep_1_1_q8", "deep_1_1_q9", "deep_1_1_q10",

  // Lesson 1-2 (10 MCQs)
  "deep_1_2_q1", "deep_1_2_q2", "deep_1_2_q3", "deep_1_2_q4", "deep_1_2_q5",
  "deep_1_2_q6", "deep_1_2_q7", "deep_1_2_q8", "deep_1_2_q9", "deep_1_2_q10",

  // Lesson 1-3 (10 MCQs)
  "deep_1_3_q1", "deep_1_3_q2", "deep_1_3_q3", "deep_1_3_q4", "deep_1_3_q5",
  "deep_1_3_q6", "deep_1_3_q7", "deep_1_3_q8", "deep_1_3_q9", "deep_1_3_q10",

  // Lesson 1-4 (10 MCQs)
  "deep_1_4_q1", "deep_1_4_q2", "deep_1_4_q3", "deep_1_4_q4", "deep_1_4_q5",
  "deep_1_4_q6", "deep_1_4_q7", "deep_1_4_q8", "deep_1_4_q9", "deep_1_4_q10",
];

export const CH1_WORKSHOP_WRITTEN_IDS = [
  // Lesson 1-1 (10 Written)
  "ws_ch1_1_w1", "ws_ch1_1_w2", "ws_ch1_1_w3", "ws_ch1_1_w4", "ws_ch1_1_w5",
  "ws_ch1_1_w6", "ws_ch1_1_w7", "ws_ch1_1_w8", "ws_ch1_1_w9", "ws_ch1_1_w10",

  // Lesson 1-2 (10 Written)
  "ws_ch1_2_w1", "ws_ch1_2_w2", "ws_ch1_2_w3", "ws_ch1_2_w4", "ws_ch1_2_w5",
  "ws_ch1_2_w6", "ws_ch1_2_w7", "ws_ch1_2_w8", "ws_ch1_2_w9", "ws_ch1_2_w10",

  // Lesson 1-3 (10 Written)
  "ws_ch1_3_w1", "ws_ch1_3_w2", "ws_ch1_3_w3", "ws_ch1_3_w4", "ws_ch1_3_w5",
  "ws_ch1_3_w6", "ws_ch1_3_w7", "ws_ch1_3_w8", "ws_ch1_3_w9", "ws_ch1_3_w10",

  // Lesson 1-4 (10 Written)
  "ws_ch1_4_w1", "ws_ch1_4_w2", "ws_ch1_4_w3", "ws_ch1_4_w4", "ws_ch1_4_w5",
  "ws_ch1_4_w6", "ws_ch1_4_w7", "ws_ch1_4_w8", "ws_ch1_4_w9", "ws_ch1_4_w10",
];

export const CH1_DEEP_IDS = CH1_WORKSHOP_MCQ_IDS;

export const CH1_ALL_IDS = [
  ...CH1_COMPREHENSIVE_MCQ_IDS,
  ...CH1_COMPREHENSIVE_WRITTEN_IDS,
  ...CH1_WORKSHOP_MCQ_IDS,
  ...CH1_WORKSHOP_WRITTEN_IDS,
];
