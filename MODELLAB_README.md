# ModelLab - ML Experiment Tracking Platform

A complete, production-ready ML experiment tracking platform integrated into the Personal Website.

## Features

### 1. Dataset Versioning System
- Drag-and-drop file upload interface
- SHA-256 checksum generation for data integrity
- Automatic schema detection for CSV and JSON files
- Version tracking with full provenance
- Support for CSV and JSON file formats
- Schema validation and metadata storage

### 2. Run Tracking
- Track every experiment run with:
  - Random seed for reproducibility
  - Git commit hash for code versioning
  - Dataset version linking
  - Timestamp tracking
  - Status tracking (pending/running/completed/failed)
- Store full hyperparameter configurations
- Link runs to datasets
- Comprehensive metadata storage

### 3. EvalHarness Evaluation Library
- Generate standardized `metrics.json` for each run
- Create `slices.json` with performance across data segments
- Generate `failure_examples.json` with concrete error cases
- Bootstrap confidence intervals for statistical significance
- Export evaluation reports
- Support for both classification and regression tasks

### 4. Comparison Dashboard
- Side-by-side run comparison
- Metric differences with statistical significance
- Configuration diff viewer
- Hyperparameter comparison
- Slice performance comparison
- Visual radar charts for metric comparison

### 5. Latency Profiling
- Measure p50/p95/p99 latency for model inference
- Warmup runs before measurement
- Support for concurrent requests
- Latency visualization with histograms and percentile curves

### 6. Artifact Storage
- Store model checkpoints (up to 500MB)
- Store training plots and visualizations
- Store evaluation reports
- Organized file structure per run
- Support for multiple file types (H5, PyTorch, JSON, images, etc.)

### 7. Frontend UI
- Modern Next.js-inspired React UI
- Dashboard with real-time statistics
- Datasets page with upload interface
- Runs page with full experiment details
- Compare page for side-by-side analysis
- Charts and visualizations using Recharts
- Responsive design with styled-components

### 8. Backend API
- Express.js API routes for all operations
- Local file storage for artifacts
- JSON file-based database for simplicity
- Full CRUD operations for datasets and runs
- RESTful API design

## Tech Stack

**Frontend:**
- React 18
- Styled Components
- Recharts for visualizations
- React Router for navigation

**Backend:**
- Express.js
- Formidable for file uploads
- Node.js filesystem operations
- JSON-based database

**Utilities:**
- SHA-256 checksums for data integrity
- Automatic schema detection
- Bootstrap statistical methods
- Git integration

## API Endpoints

### Datasets
- `GET /api/modellab/datasets` - Get all datasets
- `GET /api/modellab/datasets/:id` - Get single dataset
- `POST /api/modellab/datasets` - Upload new dataset
- `PUT /api/modellab/datasets/:id` - Update dataset
- `DELETE /api/modellab/datasets/:id` - Delete dataset

### Runs
- `GET /api/modellab/runs` - Get all runs
- `GET /api/modellab/runs/:id` - Get single run
- `POST /api/modellab/runs` - Create new run
- `PUT /api/modellab/runs/:id` - Update run
- `DELETE /api/modellab/runs/:id` - Delete run
- `POST /api/modellab/runs/:id/evaluate` - Evaluate run

### Artifacts
- `GET /api/modellab/artifacts/:runId` - Get all artifacts for a run
- `POST /api/modellab/artifacts/:runId` - Upload artifact
- `GET /api/modellab/artifacts/:runId/download/:path` - Download artifact
- `DELETE /api/modellab/artifacts/:runId/download/:path` - Delete artifact

## File Structure

```
Personal-Website/
├── src/
│   ├── pages/
│   │   └── ModelLab/
│   │       ├── index.js          # Main ModelLab app
│   │       ├── Dashboard.js       # Dashboard page
│   │       ├── Datasets.js        # Datasets management
│   │       ├── Runs.js            # Runs tracking
│   │       └── Compare.js         # Run comparison
│   └── utils/
│       └── modellab/
│           ├── storage.js         # JSON database
│           ├── schemaDetector.js  # Schema detection
│           ├── evalHarness.js     # Evaluation library
│           └── latencyProfiler.js # Latency profiling
├── api/
│   └── modellab/
│       ├── datasets.js            # Dataset API
│       ├── runs.js                # Runs API
│       └── artifacts.js           # Artifacts API
└── modellab-data/
    ├── db.json                    # JSON database
    ├── datasets/                  # Dataset files
    ├── runs/                      # Run metadata
    └── artifacts/                 # Artifact storage
        └── {runId}/
            ├── checkpoints/
            ├── plots/
            └── evaluations/
```

## Usage

### Accessing ModelLab
Navigate to `/modellab` in the Personal Website to access the platform.

### Uploading a Dataset
1. Click "Upload Dataset" on the Datasets page
2. Drag and drop a CSV or JSON file
3. Add optional metadata (name, description, tags)
4. Click "Upload" - checksum and schema will be automatically generated

### Creating a Run
1. Click "Create Run" on the Runs page
2. Fill in run details (name, description)
3. Select a dataset (optional)
4. Add hyperparameters and config as JSON
5. Click "Create" - git commit hash and seed will be auto-generated

### Comparing Runs
1. Navigate to the Compare page
2. Select two runs from the dropdowns
3. View side-by-side metrics, configs, and visualizations
4. Statistical differences are highlighted

### Evaluating a Run
Use the API to submit evaluation results:

```javascript
const response = await fetch('/api/modellab/runs/{runId}/evaluate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    predictions: [...],
    labels: [...],
    data: [...],
    config: {
      taskType: 'classification',
      classes: ['class1', 'class2'],
      sliceAttributes: ['age', 'gender']
    }
  })
});
```

## Data Storage

All data is stored locally in the `modellab-data/` directory:
- **db.json**: Main database with all metadata
- **datasets/**: Uploaded dataset files
- **artifacts/{runId}/**: Per-run artifact storage

The database is automatically initialized on first use.

## Development

The ModelLab platform is fully integrated into the Personal Website build process. To develop:

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## Production Deployment

The platform is production-ready and deployed to Vercel along with the Personal Website. All API routes and frontend pages are automatically deployed.

## Future Enhancements

Potential additions:
- PostgreSQL/MongoDB backend for scalability
- User authentication and multi-tenancy
- Remote artifact storage (S3, GCS)
- Automated hyperparameter tuning integration
- Model registry and versioning
- A/B testing framework
- Real-time training monitoring
- Slack/email notifications
- Team collaboration features

## License

Part of the Personal Website project.
