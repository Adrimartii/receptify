import { OPENAI_API_KEY } from '../config/env';

// const VISION_SYSTEM_PROMPT = `Analyze the receipt image and extract the following information in JSON format:
// - productName: The main product name
// - category: One of these categories: appliances, small-appliances, furniture, electronics, computers, tools, garden, sports, other
// - purchaseDate: The purchase date in DD-MM-YYYY format
// - price: The price in euros as a number
//
// Example response:
// {
//   "productName": "Samsung TV 55\"",
//   "category": "electronics",
//   "purchaseDate": "15-03-2024",
//   "price": 699.99
// }`;

export async function analyzeReceipt(imageBase64: string) {
  // OpenAI Vision integration temporarily disabled
  return {
    productName: '',
    category: 'other',
    purchaseDate: new Date().toLocaleDateString('fr-FR').split('/').join('-'),
    price: 0
  };

  // // Remove data:image/[type];base64, prefix if present
  // const base64Image = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');

  // const response = await fetch('https://api.openai.com/v1/chat/completions', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${OPENAI_API_KEY}`,
  //   },
  //   body: JSON.stringify({
  //     model: 'gpt-4o-mini',
  //     messages: [
  //       {
  //         role: 'system',
  //         content: VISION_SYSTEM_PROMPT,
  //       },
  //       {
  //         role: 'user',
  //         content: [
  //           {
  //             type: 'text',
  //             text: 'Please analyze this receipt and extract the required information.',
  //           },
  //           {
  //             type: 'image_url',
  //             image_url: {
  //               url: `data:image/jpeg;base64,${base64Image}`,
  //               detail: 'low'
  //             },
  //           },
  //         ],
  //       },
  //     ],
  //     max_tokens: 150,
  //     temperature: 0,
  //   }),
  // });

  // if (!response.ok) {
  //   const error = await response.json();
  //   console.error('OpenAI API error:', error);
  //   throw new Error('Failed to analyze receipt. Please try again.');
  // }

  // const data = await response.json();
  // try {
  //   const content = data.choices[0].message.content;
  //   const result = JSON.parse(content);

  //   // Ensure we have valid data with defaults if needed
  //   return {
  //     productName: result.productName || 'Produit inconnu',
  //     category: result.category || 'other',
  //     purchaseDate: result.purchaseDate || new Date().toLocaleDateString('fr-FR').split('/').join('-'),
  //     price: result.price || 0
  //   }
  // } catch (e) {
  //   console.error('Parse error:', e, 'Response:', data);
  //   throw new Error('Failed to parse OpenAI response. Please try again.');
  // }
}