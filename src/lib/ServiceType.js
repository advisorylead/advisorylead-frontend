const OpenAI = require('openai');

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ALLOWED_SERVICE_TYPES = [
  'HVAC',
  'Roofing',
  'Plumbing',
  'Electrical',
  'General Repair',
];

async function classifyServiceType({ service_type, description }) {
  const rawInput = [service_type, description].filter(Boolean).join('\n').trim();

  if (!rawInput) {
    return {
      normalizedServiceType: service_type || 'General Repair',
      confidence: 'low',
      reasoning: 'No service text provided; used fallback.',
    };
  }

  try {
    const response = await client.responses.create({
      model: 'gpt-4.1-mini',
      input: [
        {
          role: 'system',
          content: [
            {
              type: 'input_text',
              text:
                'You classify homeowner service requests into one canonical service type. Choose exactly one from this list: HVAC, Roofing, Plumbing, Electrical, General Repair. Return only valid JSON matching the schema.',
            },
          ],
        },
        {
          role: 'user',
          content: [
            {
              type: 'input_text',
              text: `Service field: ${service_type || 'N/A'}\nDescription: ${description || 'N/A'}`,
            },
          ],
        },
      ],
      text: {
        format: {
          type: 'json_schema',
          name: 'service_type_classification',
          strict: true,
          schema: {
            type: 'object',
            properties: {
              normalizedServiceType: {
                type: 'string',
                enum: ALLOWED_SERVICE_TYPES,
              },
              confidence: {
                type: 'string',
                enum: ['high', 'medium', 'low'],
              },
              reasoning: {
                type: 'string',
              },
            },
            required: ['normalizedServiceType', 'confidence', 'reasoning'],
            additionalProperties: false,
          },
        },
      },
    });

    const outputText = response.output_text;
    const parsed = JSON.parse(outputText);

    return parsed;
  } catch (error) {
    console.error('Error classifying service type:', error.message);

    return {
      normalizedServiceType: service_type || 'General Repair',
      confidence: 'low',
      reasoning: 'Classifier failed; used fallback value.',
    };
  }
}

module.exports = {
  classifyServiceType,
  ALLOWED_SERVICE_TYPES,
};