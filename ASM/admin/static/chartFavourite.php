<div>
  <canvas id="myChart"></canvas>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<script>
  const ctx = document.getElementById('myChart');

  const labels = [];
  const data = [];

  // Đoạn mã PHP để lấy dữ liệu từ vòng lặp và thêm vào mảng JavaScript
  <?php foreach ($favo as $static): ?>
    labels.push('<?php echo $static['article_name']; ?>');
    data.push(<?php echo $static['favorite_count']; ?>);
  <?php endforeach; ?>

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: '# Lượt yêu thích',
        data: data,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              var label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                label += context.parsed.y;
              }
              return label;
            }
          }
        }
      }
    }
  });
</script>
