export interface IGoogleAnalyticsServiceEvent {
	category?: string;
	label?: string;
	// A value to measure something
	value?: number;
	// If user interaction is performed
	interaction?: boolean;
	// Custom dimensions
	options?: Object;
}

export interface IGoogleAnalyticsServicePageView {
	title?: string;
	location?: string;
	// Custom dimensions
	options?: Object;
}

export interface IGoogleAnalyticsServiceAppView {
	appId?: string;
	appVersion?: string;
	installerId?: string;
};
