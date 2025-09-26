import Dexie from 'dexie';

export const db = new Dexie('buyOrByeDB');

// 데이터베이스 스키마 정의
db.version(1).stores({
  averages: '++id, age_group', // id (auto-incrementing primary key), age_group (indexed)
});

// 초기 데이터
const initialAveragesData = [
  { age_group: '20-24', avg_asset: 1000, avg_expense: 800, avg_income: 1200 },
  { age_group: '25-29', avg_asset: 1500, avg_expense: 1000, avg_income: 1800 },
  { age_group: '30-34', avg_asset: 2500, avg_expense: 1500, avg_income: 2800 },
  // 필요에 따라 다른 연령대 데이터 추가
];

// 데이터베이스를 초기 데이터로 채우는 함수
export async function populate() {
  const count = await db.averages.count();
  if (count === 0) {
    console.log('Database is empty, populating with initial data...');
    try {
      await db.averages.bulkAdd(initialAveragesData);
      console.log('Database populated successfully.');
    } catch (error) {
      console.error('Failed to populate database:', error);
    }
  } else {
    console.log('Database already contains data.');
  }
}
