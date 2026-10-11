/**
 * CHAPTER 1 — EXAM & WORKSHOP ID CONFIGURATIONS
 * Covers Lessons 1-1, 1-2, 1-3, 1-4
 */

// ============================================================================
// 1. COMPREHENSIVE CHAPTER 1 EXAM (امتحان الشابتر الأول الشامل ع المنصة)
// Exactly 50 Questions: 25 Curated MCQs + 25 In-depth Analytical Written Questions
// ============================================================================

export const CH1_COMPREHENSIVE_MCQ_IDS = [
  // Lesson 1-1 (6 MCQs)
  "deep_1_1_q1", // Moore's Law calculation
  "deep_1_1_q2", // Quantum tunneling effect
  "deep_1_1_q3", // Edge computing latency in autonomous vehicles
  "deep_1_1_q4", // Augmented Reality (AR) in practice
  "deep_1_1_q5", // Qubits superposition (8 states simultaneously)
  "deep_1_1_q7", // Cashless payments transformation

  // Lesson 1-2 (6 MCQs)
  "deep_1_2_q1", // AI ⊃ ML ⊃ DL ⊃ GenAI hierarchy
  "deep_1_2_q2", // ML vs rule-based programming
  "deep_1_2_q3", // Hidden layers feature extraction with weights
  "deep_1_2_q4", // AI Hallucination
  "deep_1_2_q5", // Why deep learning requires massive training data
  "deep_1_2_q8", // Black box problem in deep learning

  // Lesson 1-3 (6 MCQs)
  "deep_1_3_q1", // Recommendation systems
  "deep_1_3_q2", // Predictive maintenance with IoT sensors
  "deep_1_3_q3", // Narrow AI concept
  "deep_1_3_q4", // Precision agriculture with drones
  "deep_1_3_q5", // Real-time fraud detection in banking
  "deep_1_3_q7", // Computer vision in radiology & medical imaging

  // Lesson 1-4 (7 MCQs)
  "deep_1_4_q1", // Algorithmic bias in hiring data
  "deep_1_4_q2", // Privacy & facial recognition in public spaces
  "deep_1_4_q3", // Accountability in autonomous car crashes
  "deep_1_4_q4", // Transparency & explainability vs black box
  "deep_1_4_q5", // Deepfakes synthetic media dangers
  "deep_1_4_q6", // Job displacement & workforce automation
  "deep_1_4_q7", // Proactive auditing of diverse training datasets
];

// Exactly 25 Curated Written Questions for the Official Chapter 1 Exam
export const CH1_COMPREHENSIVE_WRITTEN_IDS = [
  // Lesson 1-1 (6 Written)
  "ws_ch1_1_w1", // Moore's law calculation & doubling intervals
  "ws_ch1_1_w2", // Autonomous driving edge computing latency vs cloud
  "ws_ch1_1_w3", // AR vs VR comprehensive comparison & applications
  "ws_ch1_1_w4", // Bit vs Qubit and quantum superposition power
  "ws_ch1_1_w5", // Personal computers & Internet democratizing knowledge
  "ws_ch1_1_w6", // Physical limits of silicon & quantum tunneling

  // Lesson 1-2 (6 Written)
  "ws_ch1_2_w1", // Rule-based programming vs machine learning
  "ws_ch1_2_w2", // Neural network layer architecture & role of weights
  "ws_ch1_2_w3", // AI Hallucination in healthcare & law with mitigations
  "ws_ch1_2_w4", // Deep learning superiority on unstructured medical scans
  "ws_ch1_2_w6", // Core differences between ML, DL, and GenAI
  "ws_ch1_2_w7", // Black box dilemma in justice and banking loans (XAI)

  // Lesson 1-3 (6 Written)
  "ws_ch1_3_w1", // Predictive maintenance IoT/ML architecture & economic ROI
  "ws_ch1_3_w2", // Recommendation engines & collaborative filtering
  "ws_ch1_3_w3", // Computer vision in tumor detection: augmented doctor
  "ws_ch1_3_w4", // Precision agriculture with drones: water & pesticide conservation
  "ws_ch1_3_w5", // Narrow AI definition and limitations
  "ws_ch1_3_w6", // Banking fraud detection & behavioral indicators

  // Lesson 1-4 (7 Written)
  "ws_ch1_4_w1", // Algorithmic bias root causes & technical remedies
  "ws_ch1_4_w2", // Accountability dilemma in autonomous vehicle collisions
  "ws_ch1_4_w3", // Privacy risks of facial recognition vs public security
  "ws_ch1_4_w4", // Explainable AI (XAI) necessity across critical sectors
  "ws_ch1_4_w5", // Deepfakes impact on democracy & forensic detection
  "ws_ch1_4_w6", // Job displacement: vulnerable vs resilient roles & safety nets
  "ws_ch1_4_w8", // Four pillars of institutional AI Code of Ethics
];

// Backward-compatibility alias
export const CH1_EXAM_IDS = CH1_COMPREHENSIVE_MCQ_IDS;


// ============================================================================
// 2. CHAPTER 1 WORKSHOP & PRACTICE (تدريبات ورشة حل الشابتر كامل)
// Contains the remaining questions and full training question pool
// ============================================================================

export const CH1_WORKSHOP_MCQ_IDS = [
  // Lesson 1-1
  "deep_1_1_q6", "deep_1_1_q8", "deep_1_1_q9", "deep_1_1_q10",
  "ws_extra_1_1_q1", "ws_extra_1_1_q2", "ws_extra_1_1_q4", "ws_extra_1_1_q5", "ws_extra_1_1_q8",
  "q1-1-c1", "q1-1-c2", "q1-1-c3", "q1-1-c4", "q1-1-h1", "q1-1-h2", "q1-1-wa1", "q1-1-qubit",

  // Lesson 1-2
  "deep_1_2_q6", "deep_1_2_q7", "deep_1_2_q9", "deep_1_2_q10",
  "ws_extra_1_2_q4", "ws_extra_1_2_q5", "ws_extra_1_2_q6", "ws_extra_1_2_q8",
  "q1-2-c1", "q1-2-c2", "q1-2-h1", "q1-2-h2", "q1-2-wa2", "q1-2-wb1", "q1-2-wb3", "q1-2-wc1",

  // Lesson 1-3
  "deep_1_3_q6", "deep_1_3_q8", "deep_1_3_q9", "deep_1_3_q10",
  "ws_extra_1_3_q5", "ws_extra_1_3_q7",
  "off_l3_c1_m2", "off_l3_h1_m2", "off_l3_c2_m2", "off_l3_h2_m2", "off_l3_wka_m1", "off_l3_wka_m2", "off_l3_wkb_m1", "off_l3_wkc_m1",

  // Lesson 1-4
  "deep_1_4_q8", "deep_1_4_q9", "deep_1_4_q10",
  "ws_extra_1_4_q4", "ws_extra_1_4_q5", "ws_extra_1_4_q7", "ws_extra_1_4_q8",
  "off_l4_c1_m2", "off_l4_h1_m1", "off_l4_h1_m2", "off_l4_c2_m1", "off_l4_c2_m2", "off_l4_h2_m1", "off_l4_h2_m2", "off_l4_wka_m4",
];

export const CH1_WORKSHOP_WRITTEN_IDS = [
  // Lesson 1-1
  "ws_ch1_1_w7", "ws_ch1_1_w8", "ws_ch1_1_w9", "ws_ch1_1_w10",
  // Lesson 1-2
  "ws_ch1_2_w5", "ws_ch1_2_w8", "ws_ch1_2_w9", "ws_ch1_2_w10",
  // Lesson 1-3
  "ws_ch1_3_w7", "ws_ch1_3_w8", "ws_ch1_3_w9", "ws_ch1_3_w10",
  // Lesson 1-4
  "ws_ch1_4_w7", "ws_ch1_4_w9", "ws_ch1_4_w10",
];

export const CH1_ALL_IDS = [
  ...CH1_COMPREHENSIVE_MCQ_IDS,
  ...CH1_COMPREHENSIVE_WRITTEN_IDS,
  ...CH1_WORKSHOP_MCQ_IDS,
  ...CH1_WORKSHOP_WRITTEN_IDS,
];
