import Link from 'next/link';
import SearchBar from '../components/Input/SearchBar'
import KeywordSearchButton from '../components/Button/KeyWordSearchButton'


export default function ChartView() {
    return (
        <div className="px-4 py-5 my-5 text-center">
            <h2>검색하기</h2>
            <SearchBar />
            <KeywordSearchButton />
            
            
        </div>
    );
};