import { trainingData } from './dataset.js';

export class LocalClassifier {
  constructor() {
    this.vocab = new Set();
    this.classCounts = {};
    this.wordCounts = {};
    this.totalDocs = 0;
  }

  train(text, label) {
    const tokens = this.tokenize(text);
    this.totalDocs++;
    this.classCounts[label] = (this.classCounts[label] || 0) + 1;
    
    if (!this.wordCounts[label]) {
      this.wordCounts[label] = {};
    }

    for (const token of tokens) {
      this.vocab.add(token);
      this.wordCounts[label][token] = (this.wordCounts[label][token] || 0) + 1;
    }
  }

  classify(text) {
    const tokens = this.tokenize(text);
    let bestLabel = "None";
    let maxLogProb = -Infinity;
    const scores = {};

    const classes = Object.keys(this.classCounts);
    
    if (tokens.length === 0) {
      return { label: "None", confidence: 0.9 };
    }

    for (const label of classes) {
      let logProb = Math.log(this.classCounts[label] / this.totalDocs);
      const totalWordsInClass = Object.values(this.wordCounts[label]).reduce((a, b) => a + b, 0);
      const vocabSize = this.vocab.size;

      for (const token of tokens) {
        const count = this.wordCounts[label][token] || 0;
        logProb += Math.log((count + 1) / (totalWordsInClass + vocabSize));
      }
      scores[label] = logProb;
      if (logProb > maxLogProb) {
        maxLogProb = logProb;
        bestLabel = label;
      }
    }

    const maxVal = Math.max(...Object.values(scores));
    let sumExp = 0;
    const expScores = {};
    for (const label of classes) {
      const exp = Math.exp(scores[label] - maxVal);
      expScores[label] = exp;
      sumExp += exp;
    }
    
    const confidence = expScores[bestLabel] / sumExp;
    return { label: bestLabel, confidence };
  }

  tokenize(text) {
    return text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 0);
  }
}

// -------------------------------------------------------------------
// Core ML Module Instantiation
// -------------------------------------------------------------------
export const mlModel = new LocalClassifier();

console.log(`[ML Engine] Booting Neural Protocol... Training on ${trainingData.length} records.`);
trainingData.forEach(item => mlModel.train(item.text, item.label));
console.log(`[ML Engine] Readiness State: 100%. Awaiting signals.`);
