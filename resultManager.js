// resultManager.js

// 게임 결과를 localStorage에 누적 저장
export function saveResultToLocal(programName, result, playerScore, botScore) {
    const username = localStorage.getItem("username") || "플레이어";

    const results = JSON.parse(localStorage.getItem("gameResults") || "[]");

    results.push({
        username,
        program: programName,
        result,
        playerScore,
        botScore
    });

    localStorage.setItem("gameResults", JSON.stringify(results));
}

// 모든 게임 결과를 CSV 파일로 저장
export function downloadAllResultsAsCSV() {
    const results = JSON.parse(localStorage.getItem("gameResults") || "[]");
    if (results.length === 0) {
        alert("저장된 결과가 없습니다.");
        return;
    }

    let csv = "이름,프로그램,결과,플레이어 점수,봇 점수\n";
    results.forEach(r => {
        csv += `${r.username},${r.program},${r.result},${r.playerScore},${r.botScore}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${results[0].username}_게임결과.csv`;
    a.click();

    localStorage.removeItem("gameResults"); // 다운로드 후 결과 초기화
}
