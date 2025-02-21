# Import necessary libraries
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import warnings

# Suppress pandas UserWarnings
warnings.filterwarnings('ignore', category=UserWarning, module='pandas')

# Load the dataset without specifying the date format
df = pd.read_csv('../data/BrentOilPrices.csv', parse_dates=['Date'])

# Convert the 'Date' column to datetime, letting pandas infer the format
df['Date'] = pd.to_datetime(df['Date'], errors='coerce')

# Set the Date column as index
df.set_index('Date', inplace=True)

# Output directory
output_dir = '../outputs/'

# 1. Line Plot of Oil Prices over Time
plt.figure(figsize=(12, 6))
plt.plot(df.index, df['Price'], label='Brent Oil Price')
plt.title('Brent Oil Prices Over Time')
plt.xlabel('Date')
plt.ylabel('Price (USD per Barrel)')
plt.xticks(rotation=45)
plt.grid(True)
plt.tight_layout()
plt.savefig(f'{output_dir}brent_oil_prices_line_plot.png')
plt.close()

# 2. Summary Statistics
summary_stats = df.describe()

# Save the summary statistics to CSV
summary_stats.to_csv(f'{output_dir}summary_statistics.csv')

# Save summary statistics as text file
with open(f'{output_dir}summary_statistics.txt', 'w') as f:
    f.write("Summary Statistics of Brent Oil Prices\n")
    f.write(f"{summary_stats}\n")

# 3. Boxplot for Outliers Detection
plt.figure(figsize=(8, 6))
sns.boxplot(x=df['Price'])
plt.title('Boxplot of Brent Oil Prices')
plt.xlabel('Price (USD per Barrel)')
plt.savefig(f'{output_dir}brent_oil_prices_boxplot.png')
plt.close()

# 4. Rolling Statistics (Moving Average and Standard Deviation)
rolling_mean = df['Price'].rolling(window=365).mean()  # 1-year window
rolling_std = df['Price'].rolling(window=365).std()  # 1-year window

plt.figure(figsize=(12, 6))
plt.plot(df.index, df['Price'], label='Original Price', color='blue', alpha=0.6)
plt.plot(df.index, rolling_mean, label='1-Year Rolling Mean', color='orange', linestyle='--')
plt.plot(df.index, rolling_std, label='1-Year Rolling Std', color='green', linestyle='--')
plt.title('Rolling Statistics for Brent Oil Prices (1-Year Window)')
plt.xlabel('Date')
plt.ylabel('Price (USD per Barrel)')
plt.legend()
plt.xticks(rotation=45)
plt.grid(True)
plt.tight_layout()
plt.savefig(f'{output_dir}rolling_statistics.png')
plt.close()

# 5. Check for Missing Values
missing_data = df.isnull().sum()

# Save missing data info as text
with open(f'{output_dir}missing_data.txt', 'w') as f:
    f.write("Missing Data Information\n")
    f.write(f"{missing_data}\n")

# 6. Save the EDA Outputs
print(f"EDA results saved in: {output_dir}")
