FROM permitio/pdp-v2:latest
EXPOSE 7766
CMD ["opa", "run", "--server"]
