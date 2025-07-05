require('dotenv').config({ path: '.env.local' });
const contentfulManagement = require('contentful-management');

async function checkContentType() {
  try {
    const spaceId = process.env.CONTENTFUL_SPACE_ID;
    const accessToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
    
    const client = contentfulManagement.createClient({ accessToken });
    const space = await client.getSpace(spaceId);
    const environment = await space.getEnvironment('master');
    
    // Project content type'ını al
    const contentType = await environment.getContentType('project');
    
    console.log('🔍 Project Content Type Fields:');
    console.log('================================');
    
    contentType.fields.forEach(field => {
      console.log(`📝 ${field.id}: ${field.name} (${field.type})`);
      if (field.items) {
        console.log(`   └── Array of: ${field.items.type}`);
      }
      if (field.validations && field.validations.length > 0) {
        console.log(`   └── Validations: ${JSON.stringify(field.validations)}`);
      }
    });
    
    console.log('\n✅ Field check completed!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkContentType(); 